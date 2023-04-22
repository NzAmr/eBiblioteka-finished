import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthorService } from 'src/app/core/http/author.service';
import { Author } from 'src/app/data/interfaces/Author';

@Component({
  selector: 'app-select-author',
  templateUrl: './select-author.component.html',
  styleUrls: ['./select-author.component.css']
})
export class SelectAuthorComponent implements OnInit {
  @Output() onCloseOverlay: EventEmitter<null> = new EventEmitter();
  filter: string = "";
  authors: Author[] = [];
  @Output() selectAuthor: EventEmitter<Author> = new EventEmitter();
  saveAuthor: Author = new Author;

  constructor(private authorService: AuthorService) { 
    document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');
  }

  ngOnInit(): void {
    this.load();
  }
  load() {
    this.authorService.searchAuthors(this.filter).subscribe((res) => {
      console.log(res);
      this.authors = res;
    },
      error => { console.log(error) })
  }
  closeOverlay() {
    document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');

    this.onCloseOverlay.emit();
  }
  onActionCompleted(){
    this.load();
  }
  recieveAuthor(author:Author){
    this.saveAuthor=author;
    console.log(this.saveAuthor.name);
    this.selectAuthor.emit(this.saveAuthor);
    this.onCloseOverlay.emit();
  }
}
