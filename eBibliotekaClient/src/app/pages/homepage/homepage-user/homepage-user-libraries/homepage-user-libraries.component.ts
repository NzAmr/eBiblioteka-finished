import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../../../core/http/library.service';
import { UserLibraryVM } from '../../../../data/interfaces/Library';

@Component({
  selector: 'app-homepage-user-libraries',
  templateUrl: './homepage-user-libraries.component.html',
  styleUrls: [
    './homepage-user-libraries.component.css',
    '../homepage-user.component.css',
  ],
})
export class HomepageUserLibrariesComponent implements OnInit {
  items: UserLibraryVM[] = [];
  loading: boolean = false;

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.loading = true;
    this.libraryService.getLibrariesForUser().subscribe((res) => {
      this.items = res;
      this.loading = false;
    });
  }
}
