import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/core/http/book.service';
import { Tag, TagGetVM } from 'src/app/data/interfaces/Tag';


@Component({
  selector: 'app-book-tag-auth',
  templateUrl: './book-tag-auth.component.html',
  styleUrls: ['./book-tag-auth.component.css']
})
export class BookTagAuthComponent implements OnInit {

  @Input() tag: TagGetVM;
  @Output() onActionComplete: EventEmitter<any> = new EventEmitter();

  constructor(private bookService: BookService) {
    this.tag = new Tag;
   }

  ngOnInit(): void {
    
  }
removeTag(){
this.bookService.deleteTag(this.tag.id).subscribe((res:any)=>{
  console.log("Uspjeh")
  this.onActionComplete.emit();
},(err:any)=>{
  console.log(err);
})
}
}
