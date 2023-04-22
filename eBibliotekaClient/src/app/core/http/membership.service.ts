import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../configs/HttpConfig';
import {
  MemberDetailsVM,
  MemberListVM,
  Membership,
} from '../../data/interfaces/Membership';
import { PagedList } from '../../data/types/PagedList';

@Injectable({
  providedIn: 'root',
})
export class MembershipService {
  constructor(private http: HttpClient) {}

  joinLibrary(offerId: number): Observable<null> {
    return this.http.post<null>(
      HttpConfig.EndPoints.membership.create + offerId,
      null,
      HttpConfig.httpsOptions
    );
  }

  registerPayment(
    offerId: number,
    membershipId: number
  ): Observable<Membership> {
    return this.http.post<Membership>(
      HttpConfig.EndPoints.membership.create +
        `?offerId=${offerId}&membershipId=${membershipId}`,
      null,
      HttpConfig.httpsOptions
    );
  }

  searchMembers(
    filter: string,
    page: number
  ): Observable<PagedList<MemberListVM>> {
    const url = `${HttpConfig.EndPoints.membership.searchMembers}?filter=${filter}&items_per_page=5&page_number=${page}`;

    return this.http.get<PagedList<MemberListVM>>(url);
  }

  getMemberDetails(id: number): Observable<MemberDetailsVM> {
    return this.http.get<MemberDetailsVM>(
      HttpConfig.EndPoints.membership.details + id
    );
  }
}
