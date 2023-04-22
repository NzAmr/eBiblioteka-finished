import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Author } from 'src/app/data/interfaces/Author';


@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.css']
})
export class AuthorItemComponent implements OnInit {

  @Input() author: Author;
  @Output() sendAuthor: EventEmitter<Author> = new EventEmitter();
  @Output() onCloseOverlay: EventEmitter<null> = new EventEmitter();

  constructor() { 

    this.author = new Author();
  }
  ngOnInit(): void {
  }
  send(){
    console.log(this.author);
    this.sendAuthor.emit(this.author);
    this.onCloseOverlay.emit();
  }

}
