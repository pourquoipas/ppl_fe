import { AbstractControl, FormGroup, FormControl, ValidatorFn } from '@angular/forms';

export class AbstractControlBuilder {

	private rv: AbstractControl = null;
	private name: string;
	private isGroup: boolean;
	
	public group(name: string): AbstractControlBuilder {
		if (this.rv == null) {
			this.rv = new FormGroup({});
			this.name = name;
			this.isGroup = true;
		} else {
			// raise exception
		}
		return this;
	}
	
	public control(name: string, value: any): AbstractControlBuilder {
		if (this.rv == null) {
			this.rv = new FormControl(value);
			this.name = name;
			this.isGroup = false;
		} else if (this.isGroup) {
			(this.rv as FormGroup).registerControl(name, new FormControl(name));
		} else {
			// raise exception
		}
		return this;
	}
	
	public disabled(value: boolean, name: string = null): AbstractControlBuilder {
		const ac: AbstractControl = this.findControlByName(name);
		if (ac) {
			this.disable(ac, value);
		} else {
			// raise exception
		}
		return this;
	}
	
	public validators(newValidator: ValidatorFn | ValidatorFn[], name: string = null) {
		const ac: AbstractControl = this.findControlByName(name);
		if (ac) {
			ac.setValidators(newValidator);
		} else {
			// raise exception
		}
		return this;
	}
	
	public build(): AbstractControl {
		const retVal: AbstractControl = this.rv;
		this.rv = null;
		return retVal;
	}
	
	private findControlByName(name: string): AbstractControl {
		if (name == null || this.name == name) {
			return this.rv;		
		} else if (this.isGroup){
			const ac: AbstractControl = (this.rv as FormGroup).get(name);
			if (ac) {
				return ac;
			}
		}
		return null;	
	}
	private disable(ctrl: AbstractControl, disable: boolean) {
		if (disable) {
			ctrl.disable({});
		} else {
			ctrl.enable({});
		}
	}
	
}