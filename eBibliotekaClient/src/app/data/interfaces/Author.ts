import { Library } from "./Library";

export class Author{
    id: number;
    name: string;
    /**
     *
     */
    constructor() {
        this.id = -1;
        this.name = "Učitavanje";
    }
}

export interface AuthorUpdateVM{
    id: number;
    name: string;
}