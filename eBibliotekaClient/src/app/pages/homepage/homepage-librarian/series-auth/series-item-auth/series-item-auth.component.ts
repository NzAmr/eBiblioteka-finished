import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/http/book.service';
import { SeriesListItem } from 'src/app/data/interfaces/Series';

@Component({
  selector: 'app-series-item-auth',
  templateUrl: './series-item-auth.component.html',
  styleUrls: ['./series-item-auth.component.css']
})
export class SeriesItemAuthComponent implements OnInit {

  @Input() seriesItem: SeriesListItem;
  constructor(private bookService:BookService) { 
    this.seriesItem = new SeriesListItem;
  }

  ngOnInit(): void {
  }
  
  
}
