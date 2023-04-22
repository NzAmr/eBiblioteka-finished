import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../core/http/book.service';
import { UserLentBookVM } from '../../../../data/interfaces/Book';
import { createImgPath } from '../../../../helpers/CreateImgPath';

@Component({
  selector: 'app-homepage-user-books',
  templateUrl: './homepage-user-books.component.html',
  styleUrls: [
    './homepage-user-books.component.css',
    '../homepage-user.component.css',
  ],
})
export class HomepageUserBooksComponent implements OnInit {
  items: UserLentBookVM[] = [];
  loading: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loading = true;
    this.bookService.getLentBooksForUser().subscribe((res) => {
      this.items = res.sort(
        (item1, item2) =>
          this.getDaysRemaining(item1.returnDeadline) -
          this.getDaysRemaining(item2.returnDeadline)
      );

      this.loading = false;
    });
  }

  getFullImagePath(path: string) {
    if (path) {
      return createImgPath(path);
    }
    return '';
  }

  getDaysRemaining(deadlineString: Date) {
    let deadline = new Date(deadlineString);
    let now = new Date();

    var difference = deadline.getTime() - now.getTime();

    return Math.ceil(difference / (1000 * 3600 * 24));
  }
}
