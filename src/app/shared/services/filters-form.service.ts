import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FiltersFormComponent } from '../components/filters-form/filters-form.component';
import { FiltersFormRef } from './filters-form-ref';

/** Costruzione presa a partire da:
https://blog.thoughtram.io/angular/2017/11/20/custom-overlays-with-angulars-cdk.html
 */
interface FiltersFormConfig {
	panelClass?: string; 
	hasBackdrop?: boolean;
	backdropClass?: string;
}
const DEFAULT_CONFIG: FiltersFormConfig = {
	hasBackdrop: true,
	backdropClass: 'dark-backdrop',
	panelClass: 'hr-filters-form-panel'
}

@Injectable({
	providedIn: 'root'
})
export class FiltersFormService {

	constructor(private overlay: Overlay) { }

	private getOverlayConfig(config: FiltersFormConfig): OverlayConfig {
		const positionStrategy = this.overlay.position()
			.global()
			.centerHorizontally()
			.centerVertically();

		const overlayConfig = new OverlayConfig({
			hasBackdrop: config.hasBackdrop,
			backdropClass: config.backdropClass,
			panelClass: config.panelClass,
			scrollStrategy: this.overlay.scrollStrategies.block(),
			positionStrategy
		});

		return overlayConfig;
	}

	private createOverlay(config: FiltersFormConfig) {
		// Returns an OverlayConfig
		const overlayConfig = this.getOverlayConfig(config);

		// Returns an OverlayRef
		return this.overlay.create(overlayConfig);
	}

	open(config: FiltersFormConfig = {}) {
		// Override default configuration
		const dialogConfig = { ...DEFAULT_CONFIG, ...config };

		// Returns an OverlayRef which is a PortalHost
		const overlayRef = this.createOverlay(dialogConfig);
		// Create ComponentPortal that can be attached to a PortalHost
		const filtersFormPortal = new ComponentPortal(FiltersFormComponent);

		// Attach ComponentPortal to PortalHost
		overlayRef.attach(filtersFormPortal);

		// Per farlo chiudere se si esegue un click fuori.
		overlayRef.backdropClick().subscribe(_ => dialogRef.close());

		const dialogRef = new FiltersFormRef(overlayRef);
		// Return remote control
		return dialogRef;
	}
}
