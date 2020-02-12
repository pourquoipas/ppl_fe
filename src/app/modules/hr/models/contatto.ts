import { TipoContattoEnum } from './enums/tipo-contatto-enum';
import { Entity } from 'src/app/shared/models/entity';

export class Contatto implements Entity {
	
    uuid: string;
	
	public tipo: TipoContattoEnum;
	public contatto: String;
	
}