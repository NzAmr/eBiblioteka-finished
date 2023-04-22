import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tag, TagGetVM } from 'src/app/data/interfaces/Tag';
import { HttpConfig } from '../../../configs/HttpConfig';
import { BookService } from '../../../core/http/book.service';
import {
  Book,
  BookDetailsVM,
  BookUpdateVM,
} from '../../../data/interfaces/Book';
import { ImageUploadOptions } from '../../../data/types/ImageUploadOptions';
import { Image } from '../../../data/interfaces/Image';
import { createImgPath } from '../../../helpers/CreateImgPath';
import { SeriesListItem } from 'src/app/data/interfaces/Series';

@Component({
  selector: 'app-book-detail-auth',
  templateUrl: './book-detail-auth.component.html',
  styleUrls: [
    './book-detail-auth.component.css',
    '../book-detail-user/book-detail-user.component.css',
  ],
})
export class BookDetailAuthComponent implements OnInit {
  bookId: number;
  book: BookDetailsVM;
  showEdit: boolean = false;
  showAuthors: boolean = false;
  tags: TagGetVM[];
  showAddTag: boolean = false;
  series: SeriesListItem[] = [];
  showCoverUpload: boolean = false;
  coverUploadOptions: ImageUploadOptions;

  showCheckAvailability: boolean = false;

  constructor(private bookService: BookService, private route: ActivatedRoute) {
    this.bookId = -1;
    this.book = new BookDetailsVM();
    this.tags = [];

    this.coverUploadOptions = {
      url: '',
      title: 'GRESKA',
      subtitle: '',
      currentImage: new Image(),
    };
  }

  setShowCheckAvailability(option: boolean) {
    this.showCheckAvailability = option;
  }

  ngOnInit(): void {
    this.bookId = parseInt(this.route.snapshot.params['id']);
    this.bookService.getBook(this.bookId).subscribe(
      (res) => {
        this.book = res;
        this.coverUploadOptions = {
          url: HttpConfig.EndPoints.book.coverImage + this.bookId,
          title: 'UREDI BANER SLIKU',
          subtitle:
            'Za baner sliku se preporučuje slika u omjeru 1:3, sa minimalnom rezolucijom od 400x1200. Slika će biti srezana u zavisnosti od dimenzija monitora.',
          currentImage: this.book.coverImage,
        };
      },
      (error) => {
        console.log(error);
      }
    );
    this.loadTags();
    this.loadSeries();
  }
  loadSeries() {
    this.bookService.getSeriesByBook(this.bookId).subscribe(
      (res) => {
        this.series = res;
        console.log(this.series);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  setShowEdit(option: boolean): void {
    this.showEdit = option;
  }
  setShowAddTag(option: boolean): void {
    this.showAddTag = option;
    console.log('asdasd');
  }

  Update() {
    let data: BookUpdateVM = {
      id: this.bookId,
      title: this.book.title,
      description: this.book.description,
      numberOfCopies: this.book.numberOfCopies,
    };

    this.bookService.updateBook(data).subscribe(
      (res) => {
        console.log(res);
        alert('Uspjeh!');
        this.setShowEdit(false);
      },
      (error) => {
        console.log(error);
        alert('Greska!');
      }
    );
  }
  loadTags() {
    this.bookService.getTagsByBookId(this.bookId).subscribe(
      (res) => {
        this.tags = res;
        console.log(this.tags);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  setShowCoverUpload(option: boolean) {
    this.showCoverUpload = option;
  }

  setCover(cover: Image) {
    this.book.coverImage = cover;
  }

  getCoverImagePath() {
    if (this.book.coverImage) {
      return createImgPath(this.book.coverImage.path);
    } else {
      return '';
    }
  }
}
