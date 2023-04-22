import { Book } from "./Book";

export class Series{
    id: number;
    name: string;
    books: Book[];
    libraryID: number;

    constructor(){
    this.id = -1;
    this.name = "Ucitavanje...";
    this.books = [];
    this.libraryID = -1;
    }
} 
export class SeriesListItem{
    id: number;
    name: string;
    constructor(){
    this.id = -1;
    this.name = "Ucitavanje...";
    }
} 