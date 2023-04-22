import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/core/http/book.service';
import { Author } from 'src/app/data/interfaces/Author';
import { BookAddVM } from "../../../../data/interfaces/Book";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  @Output() onCloseOverlay: EventEmitter<null> = new EventEmitter();
  author: Author;
  showAuthors: boolean = false;
  book: BookAddVM;
  copies: number = 1;
  title: string = "";
  description: string;

  constructor(private bookService: BookService) {
    this.author = new Author;
    this.author.name = "Odaberite autora->"
    this.book = new BookAddVM;
    this.description = ""

  }
  ngOnInit(): void {
  }
  closeOverlay() {
    document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');

    this.onCloseOverlay.emit();
  }
  setShowAuthors(option: boolean){
    this.showAuthors = option;
  }
  recieveAuthor(author: any){
    this.author = author;
  }

  AddAuthor(){
    this.book.title=this.title;
    this.book.authorID=this.author.id;
    this.book.numberOfCopies=this.copies;
    this.book.description=this.description;

    if(this.title.length<2){
      alert("Naslov mora sadrzavati barem 2 karaktera!");
    }
    else if(this.author.id<1){
      alert("Obavezno odabiranje autora!");
    }
    else if(this.copies<1){
      alert("Morate dodati barem 1 kopiju!");
    }
    else{
      this.bookService.addBook(this.book).subscribe((res)=>{
        alert("Uspjesno dodana knjiga!")
      },
      (error)=>{
        console.log(error);
      })

      this.closeOverlay();
    }
  }
}
