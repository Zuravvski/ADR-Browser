import { AdrStatus } from '../adr/adr-status.model';

export class Adr {
    constructor(public title: string, 
                public creationDate: Date, 
                public content: string,
                public status: AdrStatus) {}
}