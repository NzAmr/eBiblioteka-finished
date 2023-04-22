export class Tag{
    id:number;
    bookID:number;
    title: string;
    content: string;

    constructor(){
        this.id=-1;
        this.bookID=-1;
        this.title="Ucitavanje";
        this.content="Ucitavanje";
    }

    
}

export class TagAddVM{
    bookID:number;
    title: string;
    content: string;

    constructor(){
        this.bookID=-1;
        this.title="";
        this.content="";
    }
}

export class TagGetVM{
    id:number;
    title: string;
    content: string;

    constructor(){
        this.id=-1;
        this.title="Ucitavanje";
        this.content="Ucitavanje";
    }

    
}