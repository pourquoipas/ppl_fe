import { Table } from './entity';

export interface PickData<T extends Table> {
	filter: T;
	selected: T;
}