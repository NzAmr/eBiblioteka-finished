import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BusinessHours } from '../../data/interfaces/BusinessHours';

@Component({
  selector: 'app-business-hours-info',
  templateUrl: './business-hours-info.component.html',
  styleUrls: ['./business-hours-info.component.css'],
})
export class BusinessHoursInfoComponent implements OnInit {
  @Input() item: BusinessHours = new BusinessHours();
  @Input() auth: boolean = false;

  @Output() onEdit: EventEmitter<BusinessHours> = new EventEmitter<BusinessHours>();
  @Output() onDelete: EventEmitter<BusinessHours> = new EventEmitter<BusinessHours>();

  constructor() {}

  ngOnInit(): void {}

  getHour(time: string): string {
    return time.slice(0, 2);
  }

  getMinutes(time: string): string {
    return time.slice(2);
  }

  Edit() {
    this.onEdit.emit(this.item);
  }

  Delete() {
    this.onDelete.emit(this.item);
  }
}
