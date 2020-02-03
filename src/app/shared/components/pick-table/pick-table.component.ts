import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Table } from '../../models/entity';

@Component({
	selector: 'app-pick-table',
	templateUrl: './pick-table.component.html',
	styleUrls: ['./pick-table.component.scss']
})
export class PickTableComponent implements OnInit {

	//	@Input() code_name: string;
	//	@Input() desc_name: string;
	//	@Input() code_maxlen: number = 25;
	//	@Input() desc_maxlen: number = 100;
	_table: Table;
	get table(): Table {
		return this._table;
	}
	@Input()
	set table(table: Table) {
		this._table = table;
	} 
	@Input() disabled: boolean;
	@Input() codeLabel: string = 'table.label.codice';
	@Input() descLabel: string = 'table.label.descrizione';
	@Input() noClear: boolean = false;

	@Output() pick: EventEmitter<any> = new EventEmitter<any>();
	@Output() clear: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

	public onPick(event: any) {
		if (!this.disabled) {
			this.pick.emit(event);
		}
	}
	
	public onClear(event: any) {
		if (!this.disabled) {
			this._table = null;
			this.clear.emit(event);
		}
	}
}
