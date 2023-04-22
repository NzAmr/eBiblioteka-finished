import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css'],
})
export class HeadingComponent implements OnInit {
  @Input() text: string;
  @Input() size: string;
  @Input() centered: boolean = false;
  @Input() color: string;

  constructor() {
    this.text = 'null';
    this.size = 'm';
    this.color = '303030';
  }

  ngOnInit(): void {}
}
