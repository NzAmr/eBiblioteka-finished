import { Component, OnInit } from '@angular/core';
import { MembershipService } from '../../core/http/membership.service';
import { MemberListVM } from '../../data/interfaces/Membership';
import { PagedList } from '../../data/types/PagedList';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css'],
})
export class MemberSearchComponent implements OnInit {
  filter: string;
  pagedList: PagedList<MemberListVM> = new PagedList<MemberListVM>();
  loading: boolean = false;
  page: number = 1;
  url: string = '';

  selectedUser: number = -1;

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
    this.selectedUser = id;
  }
}
