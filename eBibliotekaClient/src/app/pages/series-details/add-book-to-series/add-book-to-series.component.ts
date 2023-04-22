import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/core/http/book.service';
import { BookSearchVM } from 'src/app/data/interfaces/Book';

@Component({
  selector: 'app-add-book-to-series',
  templateUrl: './add-book-to-series.component.html',
  styleUrls: ['./add-book-to-series.component.css']
})
export class AddBookToSeriesComponent implements OnInit {
  libraryID: number = -1;
  books: BookSearchVM[] = [];
  @Input() seriesID: number = -1;
  @Output() onActionComplete: EventEmitter<any> = new EventEmitter();
  filter:string = "";
  @Input() isRecommendation = false;
  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }
loadBooks(){
  this.bookService.searchLibrarianList(this.filter).subscribe((res)=>
  {
    this.books = res;
  },(err)=>{
    console.log(err);
  })
}
addBookToSeries(bookId:number){
  if(this.isRecommendation)
  {
    this.bookService.addRecommendation(bookId).subscribe((res)=>{
      this.onActionComplete.emit();
    })
  }
  else{

    this.bookService.addBookToSeries(bookId,this.seriesID).subscribe((res)=>{
      this.loadBooks();
    },(err)=>{
      console.log(err);
    })
  }
}
  onComplete(){
  this.onActionComplete.emit();
}
}
