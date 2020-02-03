import { Entity } from './entity';

export interface User extends Entity {
	username: string;
	roles: string [];
	// TODO add personal information.
}