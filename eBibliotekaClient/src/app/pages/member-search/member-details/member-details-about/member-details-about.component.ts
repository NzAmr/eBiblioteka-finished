import { Component, Input, OnInit } from '@angular/core';
import { MemberDetailsVM } from '../../../../data/interfaces/Membership';
import { getFormattedDate } from '../../../../helpers/getFormattedDate';

@Component({
  selector: 'app-member-details-about',
  templateUrl: './member-details-about.component.html',
  styleUrls: ['./member-details-about.component.css'],
})
export class MemberDetailsAboutComponent implements OnInit {
  @Input() member: MemberDetailsVM = new MemberDetailsVM();

  constructor() {}

  ngOnInit(): void {}

  getFormattedDate(date: Date) {
    return getFormattedDate(date);
  }
}
