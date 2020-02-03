import { OverlayRef } from '@angular/cdk/overlay';


export class FiltersFormRef {

	constructor(private overlayRef: OverlayRef) { }

	close(): void {
		this.overlayRef.dispose();
	}
} 