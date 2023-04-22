import { ZoomControlStyle } from '@agm/core';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { LibraryService } from '../../../core/http/library.service';
import { LibraryListVM } from '../../../data/interfaces/Library';
import {
  LibraryMapSearch,
  MapLocation,
} from '../../../data/interfaces/MapLocation';
import { createImgPath } from '../../../helpers/CreateImgPath';

@Component({
  selector: 'app-library-search-map',
  templateUrl: './library-search-map.component.html',
  styleUrls: [
    './library-search-map.component.css',
    '../library-search-list/library-search-list.component.css',
  ],
})
export class LibrarySearchMapComponent implements OnInit, OnDestroy {
  @Output() onTypeSwitch: EventEmitter<null> = new EventEmitter<null>();
  libraries: LibraryMapSearch[] = [];
  loading: boolean = false;
  view: MapLocation = {
    description: '',
    latitude: 43.7,
    longitude: 17.664559,
    zoom: 7.5,
  };

  selectedLibrary?: LibraryListVM = undefined;
  detailsLoading: boolean = false;

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    document.getElementsByTagName('body')[0].classList.add('stop-scrolling');
    this.loading = true;

    this.libraryService.searchLibrariesMap().subscribe((res) => {
      this.libraries = res;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');
  }

  switchSearchType() {
    this.onTypeSwitch.emit();
  }

  selectLibrary(id: number) {
    if (id === -1) {
      this.detailsLoading = false;
      this.selectedLibrary = undefined;
    } else {
      this.detailsLoading = true;
      this.libraryService.getLibraryForMap(id).subscribe((res) => {
        this.selectedLibrary = res;
        this.detailsLoading = false;
      });
      let library = this.libraries.find((l) => l.id === id);
      if (library) {
        this.view = {
          description: this.view.description,
          latitude: library.latitude,
          longitude: library.longitude,
          zoom: this.view.zoom,
        };
      }
    }
  }

  getFullPath(path: string) {
    if (path) {
      return createImgPath(path);
    }
    return '';
  }

  getFormattedAbout(library: LibraryListVM) {
    if (library.about && library.about.length > 150) {
      return library.about.slice(0, 430) + '...';
    }
    return library.about;
  }
}
