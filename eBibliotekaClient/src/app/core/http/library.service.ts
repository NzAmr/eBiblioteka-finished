import { HttpClient, HttpContextToken } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Library,
  LibraryListVM,
  LibraryUpdateVM,
  UserLibraryVM,
} from 'src/app/data/interfaces/Library';
import { NotificationListItemVM, SendNotificationVM } from 'src/app/data/interfaces/Notification';
import { HttpConfig } from '../../configs/HttpConfig';
import { BusinessHours } from '../../data/interfaces/BusinessHours';
import {
  LibraryMapSearch,
  MapLocation,
} from '../../data/interfaces/MapLocation';
import {
  MembershipOffer,
  MembershipOfferCreateVM,
  MembershipOfferUpdateVM,
} from '../../data/interfaces/MembershipOffer';
import { PagedList } from '../../data/types/PagedList';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(private http: HttpClient) {}

  searchLibraries(
    filter: string,
    page: number
  ): Observable<PagedList<LibraryListVM>> {
    const url = `${HttpConfig.EndPoints.library.search}?filter=${filter}&items_per_page=5&page_number=${page}`;

    return this.http.get<PagedList<LibraryListVM>>(url);
  }

  searchLibrariesMap(): Observable<LibraryMapSearch[]> {
    return this.http.get<LibraryMapSearch[]>(
      HttpConfig.EndPoints.library.searchMap
    );
  }

  getLibrary(id: number): Observable<Library> {
    const url = `${HttpConfig.EndPoints.library.details}${id}`;

    return this.http.get<Library>(url);
  }

  getLibraryForMap(id: number): Observable<LibraryListVM> {
    return this.http.get<LibraryListVM>(
      HttpConfig.EndPoints.library.detailsForMap + id
    );
  }

  getLibrariesForUser(): Observable<UserLibraryVM[]> {
    return this.http.get<UserLibraryVM[]>(HttpConfig.EndPoints.library.forUser);
  }

  librarianGetLibrary(): Observable<Library> {
    const url = `${HttpConfig.EndPoints.library.details}`;

    return this.http.get<Library>(url);
  }

  updateLibrary(data: LibraryUpdateVM): Observable<Library> {
    return this.http.post<Library>(
      HttpConfig.EndPoints.library.update,
      data,
      HttpConfig.httpsOptions
    );
  }

  addOffer(data: MembershipOfferCreateVM): Observable<MembershipOffer> {
    return this.http.post<MembershipOffer>(
      HttpConfig.EndPoints.library.membershipOffers,
      data,
      HttpConfig.httpsOptions
    );
  }

  getOffersForLibrarian(): Observable<MembershipOffer[]> {
    return this.http.get<MembershipOffer[]>(
      HttpConfig.EndPoints.library.membershipOffers
    );
  }

  updateOffer(
    id: number,
    data: MembershipOfferUpdateVM
  ): Observable<MembershipOffer> {
    return this.http.post<MembershipOffer>(
      HttpConfig.EndPoints.library.membershipOffers + id,
      data,
      HttpConfig.httpsOptions
    );
  }

  removeOffer(id: number): Observable<MembershipOffer> {
    return this.http.delete<MembershipOffer>(
      HttpConfig.EndPoints.library.membershipOffers + id
    );
  }

  addBusinessHours(hours: BusinessHours): Observable<BusinessHours> {
    return this.http.post<BusinessHours>(
      HttpConfig.EndPoints.library.businessHours + hours.id,
      hours,
      HttpConfig.httpsOptions
    );
  }

  removeBusinessHours(hours: BusinessHours): Observable<BusinessHours> {
    return this.http.delete<BusinessHours>(
      HttpConfig.EndPoints.library.businessHours + hours.id
    );
  }

  addLocation(data: MapLocation): Observable<MapLocation> {
    return this.http.post<MapLocation>(
      HttpConfig.EndPoints.location.addLocationLibrary,
      data,
      HttpConfig.httpsOptions
    );
  }

  removeLocation(): Observable<MapLocation> {
    return this.http.delete<MapLocation>(
      HttpConfig.EndPoints.location.addLocationLibrary
    );
  }
  sendNotification(data: SendNotificationVM){
    return this.http.post(HttpConfig.EndPoints.library.sendNotification,data,HttpConfig.httpsOptions);
  }
  getNotification(id:number):Observable<Notification>{
    const url = `${HttpConfig.EndPoints.library.getNotification}?=${id}`;
    return this.http.get<Notification>(url,HttpConfig.httpsOptions);
    }
    getNotificationsForUser():Observable<NotificationListItemVM[]>{
      return this.http.get<NotificationListItemVM[]>(HttpConfig.EndPoints.library.getNotificationsForUser,HttpConfig.httpsOptions);
    }
    removeNotification(id:number){
      const url = `${HttpConfig.EndPoints.library.removeNotification}?id=${id}`;
      return this.http.delete(url,HttpConfig.httpsOptions);
    }
}
