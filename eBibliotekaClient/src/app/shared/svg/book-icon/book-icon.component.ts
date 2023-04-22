import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-icon',
  templateUrl: './book-icon.component.html',
  styleUrls: ['./book-icon.component.css'],
})
export class BookIconComponent implements OnInit {
  @Input() svgClass: string;

  constructor() {
    this.svgClass = '';
  }

  ngOnInit(): void {}
}
