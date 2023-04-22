import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from 'src/app/configs/HttpConfig';
import {
  Book,
  BookAddVM,
  BookDetailsVM,
  BookSearchVM,
  BookUpdateVM,
  CanLendVM,
  LentBookAvailabilityVM,
  LentBookListVM,
  RegisterLendingSummary,
  UserLentBookVM,
} from 'src/app/data/interfaces/Book';
import { SeriesListItem } from 'src/app/data/interfaces/Series';
import { Tag, TagAddVM, TagGetVM } from 'src/app/data/interfaces/Tag';
import { PagedList } from 'src/app/data/types/PagedList';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBook(id: number): Observable<BookDetailsVM> {
    const url = `${HttpConfig.EndPoints.book.get}${id}`;
    return this.http.get<BookDetailsVM>(url, HttpConfig.httpsOptions);
  }

  getLentBooksForUser(): Observable<UserLentBookVM[]> {
    return this.http.get<UserLentBookVM[]>(HttpConfig.EndPoints.book.forUser);
  }

  addBook(book: BookAddVM): Observable<Book> {
    console.log('service');
    return this.http.post<Book>(
      HttpConfig.EndPoints.book.add,
      book,
      HttpConfig.httpsOptions
    );
  }

  registerLending(
    memberId: number,
    bookId: number,
    returnDeadline: string
  ): Observable<null> {
    return this.http.post<null>(
      HttpConfig.EndPoints.book.registerLending +
        `?bookId=${bookId}&memberId=${memberId}`,
      { returnDeadline },
      HttpConfig.httpsOptions
    );
  }

  registerReturn(id: number): Observable<null> {
    return this.http.post<null>(
      HttpConfig.EndPoints.book.registerReturn + id,
      {},
      HttpConfig.httpsOptions
    );
  }

  registerLendingSummary(
    userId: number,
    bookId: number
  ): Observable<RegisterLendingSummary> {
    return this.http.get<RegisterLendingSummary>(
      HttpConfig.EndPoints.book.registerLendingSummary +
        `?bookId=${bookId}&memberId=${userId}`
    );
  }

  searchBooks(
    filter: string,
    page: number
  ): Observable<PagedList<BookSearchVM>> {
    const url = `${HttpConfig.EndPoints.book.search}?filter=${filter}&items_per_page=20&page_number=${page}`;
    return this.http.get<PagedList<BookSearchVM>>(url);
  }
  searchLibrarianList(filter: string): Observable<BookSearchVM[]> {
    const url = `${HttpConfig.EndPoints.book.librarianListSearch}?filter=${filter}`;
    return this.http.get<BookSearchVM[]>(url, HttpConfig.httpsOptions);
  }
  searchBooksUser(
    filter: string,
    page: number,
    libraryId: number
  ): Observable<PagedList<BookSearchVM>> {
    const url = `${HttpConfig.EndPoints.book.userSearch}?filter=${filter}&libraryID=${libraryId}&items_per_page=20&page_number=${page}`;
    return this.http.get<PagedList<BookSearchVM>>(url);
  }

  updateBook(data: BookUpdateVM): Observable<Book> {
    return this.http.post<Book>(
      HttpConfig.EndPoints.book.update,
      data,
      HttpConfig.httpsOptions
    );
  }

  canLendBook(bookId: number): Observable<CanLendVM> {
    return this.http.get<CanLendVM>(HttpConfig.EndPoints.book.canLend + bookId);
  }

  getLentBooksForBook(bookId: number): Observable<LentBookAvailabilityVM[]> {
    return this.http.get<LentBookAvailabilityVM[]>(
      HttpConfig.EndPoints.book.lentBooks + bookId
    );
  }

  lendBook(bookId: number, returnDeadline: string): Observable<string> {
    return this.http.post<string>(
      HttpConfig.EndPoints.book.lend + bookId,
      { returnDeadline },
      HttpConfig.httpsOptions
    );
  }

  getLentBooksForUserByBook(bookId: number): Observable<LentBookListVM[]> {
    return this.http.get<LentBookListVM[]>(
      HttpConfig.EndPoints.book.lentBooksForUser + bookId
    );
  }
  getTag(id: number): Observable<Tag> {
    const url = `${HttpConfig.EndPoints.tag.getTag}?id=${id}`;
    return this.http.get<Tag>(url, HttpConfig.httpsOptions);
  }
  addTag(data: TagAddVM): Observable<Tag> {
    return this.http.post<Tag>(
      HttpConfig.EndPoints.tag.addTag,
      data,
      HttpConfig.httpsOptions
    );
  }
  getTagsByBookId(bookId: number): Observable<TagGetVM[]> {
    const url = `${HttpConfig.EndPoints.tag.getTags}?id=${bookId}`;
    return this.http.get<TagGetVM[]>(url, HttpConfig.httpsOptions);
  }
  deleteTag(id: number): any {
    const url = `${HttpConfig.EndPoints.tag.delete}${id}`;
    return this.http.delete(url, HttpConfig.httpsOptions);
  }
  getSeriesLibrarian(filter: string): Observable<SeriesListItem[]> {
    const url = `${HttpConfig.EndPoints.series.getSeriesLibrarian}?filter=${filter}`;
    return this.http.get<SeriesListItem[]>(url, HttpConfig.httpsOptions);
  }
  createSeries(name: string) {
    const url = `${HttpConfig.EndPoints.series.createSeries}?name=${name}`;
    return this.http.post(url, HttpConfig.httpsOptions);
  }
  getSeriesByBook(id: number): Observable<SeriesListItem[]> {
    const url = `${HttpConfig.EndPoints.series.getSeriesByBook}?id=${id}`;
    return this.http.get<SeriesListItem[]>(url, HttpConfig.httpsOptions);
  }
  getBooksBySeries(id: number): Observable<BookSearchVM[]> {
    const url = `${HttpConfig.EndPoints.series.getBooksBySeries}?id=${id}`;
    return this.http.get<BookSearchVM[]>(url, HttpConfig.httpsOptions);
  }
  addBookToSeries(bookID: number, seriesID: number) {
    const url = `${HttpConfig.EndPoints.series.addBookToSeries}?BookID=${bookID}&SeriesID=${seriesID}`;
    return this.http.post(url, HttpConfig.httpsOptions);
  }
  removeBookFromSeries(bookID: number, seriesID: number) {
    const url = `${HttpConfig.EndPoints.series.removeBookFromSeries}?BookID=${bookID}&SeriesID=${seriesID}`;
    return this.http.delete(url, HttpConfig.httpsOptions);
  }
  getRecommendations(): Observable<BookSearchVM[]>
  {
    const url = `${HttpConfig.EndPoints.book.getRecommendationsLibrarian}`;
    console.log(url);
    return this.http.get<BookSearchVM[]>(url,HttpConfig.httpsOptions);
  }
  getRecommendationsUser(id: number): Observable<BookSearchVM[]>
  {
    const url = `${HttpConfig.EndPoints.book.getRecommendationsUser}?id=${id}`;
    console.log(url);
    return this.http.get<BookSearchVM[]>(url,HttpConfig.httpsOptions);
  }
  getRecommendationsID() : Observable<number>
  {
    return this.http.get<number>(`${HttpConfig.EndPoints.book.getRecommendationsId}`, HttpConfig.httpsOptions);
  }
  deleteRecommendation(bookID:number)
  {
    const url = `${HttpConfig.EndPoints.book.deleteRecommendation}?BookID=${bookID}`;
    return this.http.delete(url,HttpConfig.httpsOptions);
  }
  addRecommendation(bookID:number){
    const url = `${HttpConfig.EndPoints.book.addRecommendation}?BookID=${bookID}`;
    return this.http.post(url,HttpConfig.httpsOptions);
  }
}
