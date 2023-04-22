import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagedListNavigation } from 'src/app/data/types/PagedList';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() data: PagedListNavigation = new PagedListNavigation();
  @Output() onNavigate: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  navigate(page: number) {
    this.onNavigate.emit(page);
  }
}
