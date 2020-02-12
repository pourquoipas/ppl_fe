import { Component, Input, ElementRef, Optional, Self, forwardRef, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInput, MatFormField } from '@angular/material';
import { ValidationService } from 'src/app/core/services/validation.service';

/** https://stackblitz.com/edit/angular-material-input-component
 */
@Component({
	selector: 'ppl-text-input',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextInputComponent),
			multi: true
		}
	],
})
export class TextInputComponent implements ControlValueAccessor {

	@Input() formGroup: FormGroup;
	@Input() controlName: string;
	@Input() placeholder: string;
	@Input() hint: string;
	@Input() class: string = "w95";
	@Input() disabled: boolean;

	constructor(
		public validationService: ValidationService,
//		private el: ElementRef, 
		private renderer: Renderer2,
	) {

	}

	private propagateChange = (val: any) => {
	};

	@ViewChild(MatInput, { static: false }) private input: MatInput;

	public get inputType(): string {
		return 'text';
	}

	public writeValue(obj: any): void {
		if (this.input) {
			this.input.value = obj || '';
		}
	}

	public registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	public registerOnTouched(fn: any): void {
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.input.disabled = isDisabled;
	}

	public onInputChange(): void {
		this.propagateChange(this.input.value);
	}
	
	public getErrors(): string {
		return this.validationService.getError(this.formGroup.controls[this.controlName]);
	}
	
	public required(): boolean {
		return this.validationService.hasRequiredField(this.formGroup.controls[this.controlName]);
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
	
}
