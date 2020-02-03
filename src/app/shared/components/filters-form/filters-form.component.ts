import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MsgService } from 'src/app/core/services/msg.service';
import { SingleFilter, FilterType } from '../../models/filter';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
	selector: 'app-filters-form',
	templateUrl: './filters-form.component.html',
	styleUrls: ['./filters-form.component.scss']
})
export class FiltersFormComponent implements OnInit {

	@Input() disabled: boolean = false;
	@Input() filters: SingleFilter[] = null;
	@Input() title: string = '';

	// TODO Capire e sistemare
	@Input() formCheckValidator: ((group: FormGroup) => void) = null;
	@Input() filterCheckValidator: any = null;

	@Output() filterChange: EventEmitter<SingleFilter[]> = new EventEmitter<SingleFilter[]>();

	public isOpen: boolean = false;

	public filtersForm: FormGroup;
	public FilterType = FilterType;

	constructor(
		private formBuilder: FormBuilder,
		private msgService: MsgService
	) { }

	ngOnInit() {
		this.initFiltersForm();
	}

	openFilters($event: any) {
		console.log('isOpen ' + this.isOpen);
		this.isOpen = !(this.isOpen);
	}
	filtersClose($event: any) {
		this.msgService.toast('Filters closed');
	}
	filtersOpen($event: any) {

	}

	public onFiltersSubmit() {

	}
	
	private initFilters() {
		this.filters.forEach(filter => {
			filter.value = filter.initialValue;
			});
	}

	// TODO Capire e sistemare
	private initFiltersForm() {
		const group: any = {};
		this.filters.forEach(filter => {
			group[filter.name] = filter.mandatory ? new FormControl(filter.value,
				[Validators.required, this.ctrlValidator(filter.name)])
				: new FormControl(filter.value, this.ctrlValidator(filter.name));
		});
		if (this.formCheckValidator) {
			this.filtersForm = this.formBuilder.group(group, { validator: this.formCheckValidator });
		} else {
			this.filtersForm = this.formBuilder.group(group);
		}
	}

	// TODO Capire e sistemare
	private ctrlValidator(name: string): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			if (!this.filterCheckValidator) {
				return null;
			} else {
				const v: boolean = this.filterCheckValidator(control, name);
				return v ? null : { invalid: true };
			}
		};
	}

	public applyFilters(event: any) {
		if (!this.disabled) {
            this.filters.forEach(filter => {
                filter.value = this.filtersForm.get(filter.name).value;
            });
            this.filterChange.emit(this.filters);

// A che serve ?? >>>            this.updateTags();
			
		}
		this.closeFilters(event);
	}
	public resetFilters(event: any) {
		this.initFilters();
		this.initFiltersForm();
	}
	public closeFilters(event: any) {
		this.isOpen = false;
	}
}


