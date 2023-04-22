import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MembershipService } from '../../../core/http/membership.service';
import { MemberListVM } from '../../../data/interfaces/Membership';
import { PagedList } from '../../../data/types/PagedList';

@Component({
  selector: 'app-register-lending-users',
  templateUrl: './register-lending-users.component.html',
  styleUrls: [
    './register-lending-users.component.css',
    '../../member-search/member-search.component.css',
  ],
})
export class RegisterLendingUsersComponent implements OnInit {
  @Output() onUserSelect: EventEmitter<number> = new EventEmitter<number>();

  filter: string;
  pagedList: PagedList<MemberListVM> = new PagedList<MemberListVM>();
  loading: boolean = false;
  page: number = 1;
  url: string = '';

  constructor(private membershipService: MembershipService) {
    this.filter = '';
  }

  ngOnInit(): void {
    this.loadPage(1);
  }
  search() {
    this.loadPage(1);
  }
  loadPage(page: number) {
    this.loading = true;
    this.membershipService.searchMembers(this.filter, this.page).subscribe(
      (res) => {
        console.log(res);
        this.pagedList = res;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  selectUser(id: number) {
    this.onUserSelect.emit(id);
  }
}
