import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  @Input() position: number = 1;
  @Input() itemWidth: number;
  @Input() gapWidth: number;
  @Input() noOfItems: number;

  constructor() {
    this.itemWidth = 295;
    this.gapWidth = 25;
    this.noOfItems = 4;
  }

  GetSliderTransform() {
    return (this.itemWidth + this.gapWidth) * (this.position - 1);
  }

  next() {
    if (this.noOfItems > this.position) this.position += 1;
  }

  back() {
    if (this.position !== 1) this.position -= 1;
  }

  ngOnInit(): void {}
}
