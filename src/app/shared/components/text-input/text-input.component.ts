import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

@Input() group: FormGroup;
@Input() placeholder: string;
@Input() controlName: string;
@Input() disabled: boolean = false;
@Input() hint: string;

  constructor() { }

  ngOnInit() {
  }

}
