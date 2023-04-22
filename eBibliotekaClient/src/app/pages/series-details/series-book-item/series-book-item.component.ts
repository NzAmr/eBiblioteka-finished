import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BookService } from 'src/app/core/http/book.service';
import { BookSearchVM } from 'src/app/data/interfaces/Book';
import { createImgPath } from 'src/app/helpers/CreateImgPath';

@Component({
  selector: 'app-series-book-item',
  templateUrl: './series-book-item.component.html',
  styleUrls: ['./series-book-item.component.css']
})
export class SeriesBookItemComponent implements OnInit {
  @Input() book: BookSearchVM = new BookSearchVM();
  @Input() seriesID: number;
  @Input() loading: boolean = false;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  auth: boolean = false;
  @Input() isRecommedation: boolean = false;

  constructor(private bookService: BookService , private authService:AuthService) {
    this.seriesID = -1;
  }

  ngOnInit(): void {
    this.authService.BookAuthCheck(this.book.id).subscribe((res) => {
      console.log(res);
      if (res) {
        this.auth = true;
      }
      this.loading = false;
    });
  }
  getFullImagePath(path: string) {
    if (path) {
      return createImgPath(path);
    }
    return '';
  }
  removeBookFromSeries() {
    if(this.isRecommedation)
    {
      this.bookService.deleteRecommendation(this.book.id).subscribe((res)=>{
        this.onDelete.emit();
      })
    }
    else{

      this.bookService.removeBookFromSeries(this.book.id, this.seriesID).subscribe((res) => {
        console.log(res);
        this.onDelete.emit();
      }, (err) => {
        console.log(err);
      })
    }
  }
}
