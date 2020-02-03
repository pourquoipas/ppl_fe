/** i tipi filtri possibili (come controllo e/o dato da gestire) */
export enum FilterType {
	Input,
}

export enum FilterKind {
	eq,
	like,
	ge,
	le
}

export interface SingleFilter {
	name: string;
	field: string;
	label: string;
	type: FilterType;
	kind: FilterKind;
	initialValue?: any;
	value?: any;
	maxlength?: number;
	mandatory?: boolean;
}