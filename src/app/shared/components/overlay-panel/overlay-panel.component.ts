import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { filter, switchMap, share, startWith, debounceTime, takeUntil, switchMapTo } from 'rxjs/operators';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

/** Esempio adattato da:
https://stackblitz.com/edit/angular-material2-issue-fid7gp
*/

@Component({
	selector: 'hr-overlay-panel',
	templateUrl: './overlay-panel.component.html',
	styleUrls: ['./overlay-panel.component.scss']
})
export class OverlayPanelComponent implements OnDestroy, OnInit {
	@Input() overlayOrigin: CdkOverlayOrigin;
	@Output() close = new EventEmitter<any>();
	@Output() open = new EventEmitter<any>();

	@Input() width: string = '640px';
	@Input() height: string = '480px';

	get isOpen() {
		return this.isOpened;
	}
	@Input('isOpen')
	set isOpen(value: boolean) {
		if (value != this.isOpened) {
			this.changeState(value);
		}
	}
	
	@Input() openOnMouseOver: boolean = false;


	@ViewChild('dialog', { static: false }) dialog: ElementRef;
	isOpened = false;
	destroy$ = new Subject<any>();

	constructor(private changeDetectorRef: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		const overlayOriginEl = this.overlayOrigin.elementRef.nativeElement;

		// open popup if mouse stopped in overlayOriginEl (for short time).
		// If user just quickly got over overlayOriginEl element - do not open
		const open$ = fromEvent(overlayOriginEl, 'mouseenter')
			.pipe(
				filter(() => this.openOnMouseOver),
				filter(() => this.debug('prima di open')),
				filter(() => !this.isOpened),
				switchMap(enterEvent =>
					fromEvent(document, 'mousemove')
						.pipe(
							filter(() => this.debug('prima di enterEvent')),

							startWith(enterEvent),
							debounceTime(300),
							filter(event => overlayOriginEl === event['target'])
						)
				),
				share()
			);
		open$.pipe(
			filter(() => this.debug('seconda di open')),
			takeUntil(this.destroy$),
		).subscribe(() => this.changeState(true));

		// close if mouse left the overlayOriginEl and dialog(after short delay)
		const close$ = fromEvent(document, 'mousemove')
			.pipe(
				filter(() => this.debug('prima di close')),
				debounceTime(100),
				filter(() => this.isOpened),
				filter(event => this.isMovedOutside(overlayOriginEl, this.dialog, event))
			);

		open$
			.pipe(
				filter(() => this.debug('terza di open')),
				takeUntil(this.destroy$),
				switchMapTo(close$)
			).subscribe(() => {
				this.changeState(false);
			});

	}

	ngOnDestroy(): void {
		this.destroy$.next();
	}

	connectedOverlayDetach() {
		this.changeState(false);
	}

	private changeState(isOpened: boolean) {
		this.isOpened = isOpened;
		isOpened ? this.open.emit() : this.close.emit();
//		if (isOpened) {
//			this.dialog.nativeElement.style.width = this.width;
//			this.dialog.nativeElement.style.height = this.height;
//		}
		this.changeDetectorRef.markForCheck();
	}

	private isMovedOutside(overlayOriginEl, dialog, event): boolean {
		return !(overlayOriginEl.contains(event['target']) || dialog.nativeElement.contains(event['target']));
	}

	// Per debug, poi cavalavala
	private debug(label = 'null'): boolean {
		// console.log('debug: ' + label);
		return true;
	}
}
