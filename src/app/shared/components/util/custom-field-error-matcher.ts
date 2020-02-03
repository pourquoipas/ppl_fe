import { ErrorStateMatcher } from "@angular/material";
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class CustomFieldErrorMatcher implements ErrorStateMatcher {
  constructor(private customControl: FormControl,private errors:any) { }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return this.customControl && this.customControl.touched &&(this.customControl.invalid || this.errors);
  }
}