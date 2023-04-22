import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LibraryService } from '../../../core/http/library.service';
import { LibraryListVM } from '../../../data/interfaces/Library';
import { PagedList } from '../../../data/types/PagedList';

@Component({
  selector: 'app-library-search-list',
  templateUrl: './library-search-list.component.html',
  styleUrls: ['./library-search-list.component.css'],
})
export class LibrarySearchListComponent implements OnInit {
  @Output() onTypeSwitch: EventEmitter<null> = new EventEmitter<null>();

  pagedList: PagedList<LibraryListVM> = new PagedList<LibraryListVM>();
  loading: boolean = false;
  filter: string = '';
  page: number = 1;
  filterStatic: string = '';

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.loading = true;
    this.libraryService.searchLibraries(this.filter, page).subscribe(
      (res) => {
        this.filterStatic = this.filter;
        this.loading = false;
        this.pagedList = res;
        console.log(this.pagedList);
        window.scroll(0, 0);
      },
      (res) => {
        this.loading = false;
      }
    );
  }

  search() {
    console.log(this.filter);
    this.loadPage(1);
  }

  switchSearchType() {
    this.onTypeSwitch.emit();
  }
}
