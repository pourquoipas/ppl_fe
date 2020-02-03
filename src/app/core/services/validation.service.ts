import { Injectable } from '@angular/core';
import { Validators, ValidatorFn, FormControl } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class ValidationService {

	constructor() { }

    static numeric2DecimalPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    static numeric5DecimalPattern = '^-?[0-9]\\d*(\\.\\d{1,5})?$';

	static integerPattern = "^-?[0-9]*$";
	static positiveIntegerPattern = "^[0-9]*$";

	// Validatori semplici
	/** numero intero, senza separatori decimali */
	public integer(): ValidatorFn {
		return Validators.pattern(ValidationService.integerPattern);
	}
	/** numero intero positivo, senza separatori decimali */
	public positiveInteger(): ValidatorFn {
		return Validators.pattern(ValidationService.positiveIntegerPattern);
	}
	/** lunghezza massima */
	public max(length: number): ValidatorFn {
		return Validators.maxLength(length);
	}
	/** lunghezza minima */
	public min(length: number): ValidatorFn {
		return Validators.minLength(length);
	}
	/** Campo obbligatorio */
	public required(): ValidatorFn {
		return Validators.required;
	}
	
	// Validatori composti
	public cap(): ValidatorFn {
		return Validators.compose([
			this.positiveInteger(), 
			this.min(5), 
			this.max(5)
		]);
	}
	/** testo obbligatorio con una lunghezza massima */
	public textRequiredMax(maxLen: number): ValidatorFn {
		return Validators.compose([
			this.required(),
			this.max(maxLen)
		]);
	}
	/** codice standard di una tabella: required e max len = 25 */
	public codice(): ValidatorFn {
		return this.textRequiredMax(25);
	}
	/** descrizione standard di una tabella: required e max len = 100 */
	public descrizione(): ValidatorFn {
		return this.textRequiredMax(100);
	}
	/** Generico anno, intero e lungo max 4 caratteri. */
	public anno(): ValidatorFn {
		return Validators.compose([
			this.integer(), this.max(4)
		])
	}
	
	public getError(control: FormControl): string {
		let rv = '';
		if (control) {
			if (control.errors)	{
				Object.keys(control.errors).forEach(key => {
					if (rv.length > 0) {
						rv = rv + ' - ';
					}
					if ('minlength' === key) {
						rv = rv + this.minlength(control.errors[key]);
					} else if ('maxlength' === key) {
						rv = rv + this.maxlength(control.errors[key]);
					} else if ('pattern' === key) {
						rv = rv + this.pattern(control.errors[key]);
					} else {
						rv = rv + key + '[' + JSON.stringify(control.errors[key]);
					}
				
				})
			}
		}
		return rv;
	}

	// Errori standard
	public minlength(error:any): string {
		return 'La lunghezza minima del campo è ' + error.requiredLength + ' caratteri';
	}
	public maxlength(error:any): string {
		return 'La lunghezza massima del campo è ' + error.requiredLength + ' caratteri';
	}
	public pattern(error:any): string {
		return 'Il testo immesso non rappresenta un dato valido per questo campo';
	}
}
