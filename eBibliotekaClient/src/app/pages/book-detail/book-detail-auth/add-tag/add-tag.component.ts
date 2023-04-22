import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/core/http/book.service';
import { Tag, TagAddVM } from 'src/app/data/interfaces/Tag';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css'],
})
export class AddTagComponent implements OnInit {
  @Output() onCloseOverlay: EventEmitter<null> = new EventEmitter();
  tag: TagAddVM;
  @Input() bookID: number;
  constructor(private bookService: BookService) {
    this.tag = new TagAddVM();
    this.bookID = -1;
  }

  ngOnInit(): void {
    this.tag.bookID == this.bookID;
    document.getElementsByTagName('body')[0].classList.add('stop-scrolling');
  }

  addTag() {
    if (this.tag.title.length < 2 || this.tag.content.length < 2) {
      alert('I naslov i tekst moraju imati barem 2 karaktera!');
    } else {
      this.tag.bookID = this.bookID;
      this.bookService.addTag(this.tag).subscribe((res) => {
        this.onCloseOverlay.emit();
      });
    }
  }

  closeOverlay() {
    document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');
    this.onCloseOverlay.emit();
  }

  getScrollPos() {
    return window.scrollY;
  }
}
