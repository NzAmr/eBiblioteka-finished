import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MemberListVM } from '../../../data/interfaces/Membership';
import { createImgPath } from '../../../helpers/CreateImgPath';
import { getFormattedDate } from '../../../helpers/getFormattedDate';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  @Input() members: MemberListVM[] = [];
  @Input() loading: boolean = false;
  @Output() onActionClick: EventEmitter<number> = new EventEmitter<number>();
  @Input() actionText: string = 'VIŠE OPCIJA';
  showSendNotification:boolean = false;
  currentMemberID: number = -1;

  constructor() {}

  ngOnInit(): void {
    console.log(this.members);
  }

  getFormattedDate(date: Date) {
    return getFormattedDate(date);
  }

  getFullImagePath(path: string): string {
    if (path) {
      return createImgPath(path);
    }
    return '';
  }

  setShowSendNotification(option : boolean){
    this.showSendNotification = option;
  }
  selectUser(id: number) {
    this.onActionClick.emit(id);
  }
  addInputID(id:number)
  {
    this.currentMemberID = id;
  }
}
