import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
//import { loadavg } from 'os';
import { AuthorService } from 'src/app/core/http/author.service';
import { Author } from 'src/app/data/interfaces/Author';

@Component({
  selector: 'app-authors-list-item',
  templateUrl: './authors-list-item.component.html',
  styleUrls: ['./authors-list-item.component.css']
})
export class AuthorsListItemComponent implements OnInit {
  @Input() author: Author;
  @Output() onActionComplete: EventEmitter<any> = new EventEmitter();
  enableUpdate: boolean = false;
  updateText: string = "";


  constructor(private authorService: AuthorService) {
    this.author = new Author();
  }

  ngOnInit(): void {
    this.updateText = this.author.name;
  }

  updateAuthor() {
    
    if (this.updateText.length > 3) {

      this.author.name = this.updateText;
      this.authorService.updateAuthor(this.author).subscribe((res) => {
        this.enableUpdate = false;
        console.log(this.author.name);
        this.onActionComplete.emit();
        alert("Uspješno izmjenjen autor!");
      },
        (error) => {
          console.log(error);
        }
      )
    }
    else {

      alert("Ime i prezime autora moraju sadrzavati barem 3 karaktera!");
    }
  }
  deleteAuthor() {

    this.authorService.deleteAuthor(this.author).subscribe(() => {

      this.onActionComplete.emit()
    }, () => {

    })
    console.log(this.author.name);

  }
}
