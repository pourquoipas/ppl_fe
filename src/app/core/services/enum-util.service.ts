import { Injectable } from '@angular/core';

export class ComboEntry {
	constructor(
		public label: string,
		public value: string) {
	}
}

@Injectable({
	providedIn: 'root'
})
export class EnumUtilService {

	constructor() { }

	public enumToArray(e: any, enumName: string): ComboEntry[] {
		let rv: ComboEntry[] = [];
		for (const [i, val] of Object.keys(e).entries()) {
			rv.push(
				new ComboEntry('ENUM.' + enumName + '.' + val, val)
			);
		}
		return rv;
	}
	public enumFind(e: any, enumName: string, value: string): ComboEntry {
		if (value) {
			for (const [i, val] of Object.keys(e).entries()) {
				if (val === value) {
					return new ComboEntry('ENUM.' + enumName + '.' + val, val);
				}
			}
		}
	}
	
}
