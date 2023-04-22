import { Component, Input, OnInit } from '@angular/core';
import { Tag, TagGetVM } from 'src/app/data/interfaces/Tag';

@Component({
  selector: 'app-book-tag-user',
  templateUrl: './book-tag-user.component.html',
  styleUrls: ['./book-tag-user.component.css']
})
export class BookTagUserComponent implements OnInit {
  @Input() tag: TagGetVM;
  constructor() {
    this.tag = new Tag;
   }

  ngOnInit(): void {
  }

}
