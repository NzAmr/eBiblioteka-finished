import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/data/interfaces/Tag';

@Component({
  selector: 'app-book-tag-item',
  templateUrl: './book-tag-item.component.html',
  styleUrls: ['./book-tag-item.component.css']
})
export class BookTagItemComponent implements OnInit {

  @Input() tag: Tag;

  constructor() {
    this.tag=new Tag;
   }

  ngOnInit(): void {
  }

}
