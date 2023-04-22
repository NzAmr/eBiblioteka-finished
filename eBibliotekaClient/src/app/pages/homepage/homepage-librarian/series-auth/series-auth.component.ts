import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/core/http/book.service';
import { SeriesListItem } from 'src/app/data/interfaces/Series';

@Component({
  selector: 'app-series-auth',
  templateUrl: './series-auth.component.html',
  styleUrls: ['./series-auth.component.css']
})
export class SeriesAuthComponent implements OnInit {
  @Output() onCloseOverlay: EventEmitter<any> = new EventEmitter();
  series: SeriesListItem[];
  filter: string = "";
  addNew:string; 
  constructor(private bookService: BookService) {
    this.series = [];
    //this.filter = "";
    this.addNew = "";
   }

  ngOnInit(): void {
    this.loadSeries();
  }
  closeOverlay() {
    
    this.onCloseOverlay.emit();
  }
  loadSeries(){
    this.bookService.getSeriesLibrarian(this.filter).subscribe((res)=>{
      this.series = res;
      console.log(this.series);
    })
  }
  addNewSeries(){
    if (this.addNew.length<1) {
      alert("Naziv novog serijala ne smije biti prazno polje!");
      
    }
    else{
      this.bookService.createSeries(this.addNew).subscribe((res)=>{
        this.loadSeries();
        this.addNew = "";
      },(err)=>{
        console.log(err);
      })
    }
  }
}
