import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthorService } from 'src/app/core/http/author.service';
import { Author } from 'src/app/data/interfaces/Author';
import { PagedList } from 'src/app/data/types/PagedList';


@Component({
  selector: 'app-authors-form',
  templateUrl: './authors-form.component.html',
  styleUrls: ['./authors-form.component.css']
})
export class AuthorsFormComponent implements OnInit {
  @Output() onCloseOverlay: EventEmitter<null> = new EventEmitter();

  filter: string = "";
  add: string = "";

  authors: Author[] = [];

  constructor(private authorService: AuthorService) {
    document.getElementsByTagName('body')[0].classList.add('stop-scrolling');
  }

  ngOnInit(): void {
    this.load();
  }

  closeOverlay() {
    document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');

    this.onCloseOverlay.emit();
  }

  load() {
    this.authorService.searchAuthors(this.filter).subscribe((res) => {
      this.authors = res;
    },
      error => { console.log(error) })
  }

  addAuthor(data: string) {
    if (data.length>3) {
      
      this.authorService.addAuthor(data).subscribe((res)=>{
        
        this.load();
        alert("Uspješno dodan novi autor!");
        this.add = "";
      },
      error=>{console.log(error);}
      )
      
    }
    else{

      alert("Ime i prezime autora moraju sadrzavati barem 3 karaktera!");
    }

  }

  search(){
    
    this.load();
  }
  onActionCompleted(){
    
    this.search();
  }
}
