import { Component, Input, forwardRef, OnDestroy, ElementRef, AfterViewInit, Injector, ViewChild, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl, ControlContainer, AbstractControl, AbstractControlDirective, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CustomFieldErrorMatcher } from '../util/custom-field-error-matcher';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		},
        {
            provide: MatFormFieldControl,
            useExisting: InputComponent
        }
	]
})
export class InputComponent implements ControlValueAccessor, MatFormFieldControl<any>, OnDestroy, AfterViewInit {

	@Input() fieldName: string;
	@Input() class: string;
	@Input() hint: string; 
	
    static nextId = 0;

    stateChanges: Subject<void> = new Subject<void>();

    ngControl: NgControl = null;	
    errorState: boolean = false;
    describedBy: string = '';
	
// MatFormFieldControl 
    empty: boolean;
    shouldLabelFloat: boolean;
    disabled: boolean = false;
    controlType?: string = 'text-box';
    autofilled?: boolean;

    id: string = `text-box-${InputComponent.nextId++}`;
    focused: boolean = false;
	
    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    private _placeholder: string;	

    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _required = false;

    @Input() name: string;

    onChange: any = () => {};
    onTouched: any = () => {};

    isDisabled: boolean = false;

    @Input('value') val: string;
    get value(): any {
        return this.val;
    }
    set value(val: any) {
        this.val = val;
        this.errorState = !val;
        this.onChange(val);
        this.onTouched();
        this.stateChanges.next();
    }
    constructor(
		private fm: FocusMonitor, 
		private elRef: ElementRef<HTMLElement>,
//		private ctrl: ControlContainer
		public injector: Injector,
		public validationService: ValidationService,
	 	private renderer: Renderer2
	) {
        fm.monitor(elRef, true).subscribe(origin => {
            this.focused = !!origin;
            this.stateChanges.next();
        });
    }

    writeValue(value: any): void {
        if (value) {
            this.value = value;
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    setDescribedByIds(ids: string[]): void {
        this.describedBy = ids.join(' ');
    }
    onContainerClick(event: MouseEvent): void {
        if ((event.target as Element).tagName.toLowerCase() != 'input') {
            this.elRef.nativeElement.querySelector('input')!.focus();
        }
    }

    ngOnDestroy(): void {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef);
    }

//	get control(): AbstractControlDirective {
//		return this.ctrl;
//	}
// 
//	ngOnInit() {
//	}
//
//	@ViewChild(DefaultValueAccessor, { static: false }) valueAccessor: DefaultValueAccessor;
//

// TEST: https://stackoverflow.com/questions/58459617/component-for-wrap-angular-material-input-does-not-show-error-styles
control: FormControl;
	ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl, null);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
      })
    }		
	}
	
  @Input() errors:any=null;
	
  errorMatcher() {
    return new CustomFieldErrorMatcher(this.control,this.errors)
  }

public getErrors(): string {
	return this.validationService.getError(this.control);
}


// Scroll errori
  left = 0;
  @ViewChild('parentTag', {static: false})
  parentTag: ElementRef; 

  @ViewChild('target', {static: false})
  target: ElementRef;

//  constructor(private el:ElementRef, private renderer: Renderer2){
//
//  } 

  move(){
    console.log(this.parentTag.nativeElement.clientWidth); 
    console.log(this.target.nativeElement.scrollWidth);
    let left = this.target.nativeElement.scrollWidth - 
    this.parentTag.nativeElement.clientWidth; 
    this.renderer.setStyle(this.target.nativeElement, 'margin-left', '-'+left+'px');
  }

  stop(){
    this.renderer.setStyle(this.target.nativeElement, 'margin-left', '0px');
  }

@Input() form: FormGroup;


}
