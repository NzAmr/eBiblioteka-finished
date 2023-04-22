import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { RegisterComponent } from './core/register/register.component';
import { HeaderUnauthorizedComponent } from './core/header/header-unauthorized/header-unauthorized.component';
import { RegisterUserComponent } from './core/register/register-user/register-user.component';
import { HeadingComponent } from './shared/heading/heading.component';
import { RegisterLibraryComponent } from './core/register/register-library/register-library.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './shared/loading/loading.component';
import { LoginComponent } from './core/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpConfig } from './configs/HttpConfig';
import { HeaderUserComponent } from './core/header/header-user/header-user.component';
import { HeaderLibrarianComponent } from './core/header/header-librarian/header-librarian.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LibrarySearchComponent } from './pages/library-search/library-search.component';
import { LibraryListComponent } from './pages/library-search/library-list/library-list.component';
import { FooterComponent } from './core/footer/footer.component';
import { LibraryDetailComponent } from './pages/library-detail/library-detail.component';
import { HomepageUserComponent } from './pages/homepage/homepage-user/homepage-user.component';
import { HomepageLibrarianComponent } from './pages/homepage/homepage-librarian/homepage-librarian.component';
import { LandingPageComponent } from './pages/homepage/landing-page/landing-page.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { UserIconComponent } from './shared/svg/user-icon/user-icon.component';
import { ImageUploadComponent } from './shared/image-upload/image-upload.component';
import { UpdateAccountComponent } from './pages/my-account/update-account/update-account.component';
import { UpdatePasswordComponent } from './pages/my-account/update-password/update-password.component';
import { MyAccountUserComponent } from './pages/my-account/my-account-user/my-account-user.component';
import { MyAccountLibrarianComponent } from './pages/my-account/my-account-librarian/my-account-librarian.component';
import { AuthGuardService } from './core/auth/guards/auth-guard.service';
import { AuthorsFormComponent } from './pages/homepage/homepage-librarian/authors-form/authors-form.component';
import { AuthorsListItemComponent } from './pages/homepage/homepage-librarian/authors-form/authors-list-item/authors-list-item.component';
import { WalletIconComponent } from './shared/svg/wallet-icon/wallet-icon.component';
import { BookIconComponent } from './shared/svg/book-icon/book-icon.component';
import { SliderComponent } from './shared/slider/slider.component';
import { MembershipOfferComponent } from './pages/homepage/homepage-librarian/membership-offer/membership-offer.component';
import { MembershipOfferAuthComponent } from './pages/homepage/homepage-librarian/membership-offer/membership-offer-auth/membership-offer-auth.component';
import { MembershipOfferCreateComponent } from './pages/homepage/homepage-librarian/membership-offer/membership-offer-create/membership-offer-create.component';
import { AddBookComponent } from './pages/homepage/homepage-librarian/add-book/add-book.component';
import { AuthorItemComponent } from './shared/author-item/author-item.component';
import { BookSearchComponent } from './pages/book-search/book-search.component';
import { BookListComponent } from './pages/book-search/book-list/book-list.component';
import { BusinessHoursInfoComponent } from './shared/business-hours-info/business-hours-info.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { BusinessHoursEditComponent } from './pages/homepage/homepage-librarian/business-hours-edit/business-hours-edit.component';
import { SelectAuthorComponent } from './shared/select-author/select-author.component';
import { BookDetailAuthComponent } from './pages/book-detail/book-detail-auth/book-detail-auth.component';
import { BookDetailUserComponent } from './pages/book-detail/book-detail-user/book-detail-user.component';
import { MembershipFormComponent } from './pages/library-detail/membership-form/membership-form.component';
import { LibraryCardComponent } from './shared/library-card/library-card.component';
import { LendBookFormComponent } from './pages/book-detail/book-detail-user/lend-book-form/lend-book-form.component';
import { MemberSearchComponent } from './pages/member-search/member-search.component';
import { MemberListComponent } from './pages/member-search/member-list/member-list.component';
import { BookTagItemComponent } from './pages/book-detail/book-tag-item/book-tag-item.component';
import { BookTagAuthComponent } from './pages/book-detail/book-detail-auth/book-tag-auth/book-tag-auth.component';
import { BookTagUserComponent } from './pages/book-detail/book-detail-user/book-tag-user/book-tag-user.component';
import { AddTagComponent } from './pages/book-detail/book-detail-auth/add-tag/add-tag.component';
import { SeriesAuthComponent } from './pages/homepage/homepage-librarian/series-auth/series-auth.component';
import { SeriesItemAuthComponent } from './pages/homepage/homepage-librarian/series-auth/series-item-auth/series-item-auth.component';
import { MemberDetailsComponent } from './pages/member-search/member-details/member-details.component';
import { MemberDetailsAboutComponent } from './pages/member-search/member-details/member-details-about/member-details-about.component';
import { MemberDetailsBooksComponent } from './pages/member-search/member-details/member-details-books/member-details-books.component';
import { MemberDetailsPaymentsComponent } from './pages/member-search/member-details/member-details-payments/member-details-payments.component';
import { SeriesDetailsComponent } from './pages/series-details/series-details.component';
import { SeriesBookItemComponent } from './pages/series-details/series-book-item/series-book-item.component';
import { BooksSeriesFormComponent } from './pages/series-details/books-series-form/books-series-form.component';
import { AddBookToSeriesComponent } from './pages/series-details/add-book-to-series/add-book-to-series.component';
import { AddBookItemComponent } from './pages/series-details/add-book-to-series/add-book-item/add-book-item.component';
import { HomepageUserLibrariesComponent } from './pages/homepage/homepage-user/homepage-user-libraries/homepage-user-libraries.component';
import { HomepageUserBooksComponent } from './pages/homepage/homepage-user/homepage-user-books/homepage-user-books.component';

import { AgmCoreModule } from '@agm/core';
import { LibrarySearchListComponent } from './pages/library-search/library-search-list/library-search-list.component';
import { LibrarySearchMapComponent } from './pages/library-search/library-search-map/library-search-map.component';
import { DatePickerComponent } from './shared/date-picker/date-picker.component';
import { CheckAvailabilityComponent } from './shared/check-availability/check-availability.component';
import { CheckAvailabilityAuthComponent } from './pages/book-detail/book-detail-auth/check-availability-auth/check-availability-auth.component';
import { RegisterLendingComponent } from './pages/register-lending/register-lending.component';
import { RegisterLendingUsersComponent } from './pages/register-lending/register-lending-users/register-lending-users.component';
import { RegisterLendingBooksComponent } from './pages/register-lending/register-lending-books/register-lending-books.component';
import { RegisterLendingSummaryComponent } from './pages/register-lending/register-lending-summary/register-lending-summary.component';
import { LandingPageUserComponent } from './pages/homepage/landing-page/landing-page-user/landing-page-user.component';
import { LandingPageLibrarianComponent } from './pages/homepage/landing-page/landing-page-librarian/landing-page-librarian.component';
import { LandingPageHowLibrarianComponent } from './pages/homepage/landing-page/landing-page-librarian/landing-page-how-librarian/landing-page-how-librarian.component';
import { LandingPageHowUserComponent } from './pages/homepage/landing-page/landing-page-user/landing-page-how-user/landing-page-how-user.component';
import { SendNotificationComponent } from './pages/member-search/member-list/send-notification/send-notification.component';
import { NotificationListComponent } from './shared/notification-list/notification-list.component';



export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    HeaderUnauthorizedComponent,
    RegisterUserComponent,
    HeadingComponent,
    RegisterLibraryComponent,
    LoadingComponent,
    LoginComponent,
    HeaderUserComponent,
    HeaderLibrarianComponent,
    PaginationComponent,
    HomepageComponent,
    LibrarySearchComponent,
    LibraryListComponent,
    FooterComponent,
    LibraryDetailComponent,
    HomepageUserComponent,
    HomepageLibrarianComponent,
    LandingPageComponent,
    MyAccountComponent,
    UserIconComponent,
    ImageUploadComponent,
    UpdateAccountComponent,
    UpdatePasswordComponent,
    MyAccountUserComponent,
    MyAccountLibrarianComponent,
    AuthorsFormComponent,
    AuthorsListItemComponent,
    MembershipOfferComponent,
    WalletIconComponent,
    BookIconComponent,
    SliderComponent,
    MembershipOfferAuthComponent,
    MembershipOfferCreateComponent,
    AddBookComponent,
    AuthorItemComponent,
    BookSearchComponent,
    BookListComponent,
    BusinessHoursInfoComponent,
    BookDetailComponent,
    BusinessHoursEditComponent,
    SelectAuthorComponent,
    BookDetailAuthComponent,
    BookDetailUserComponent,
    MembershipFormComponent,
    LibraryCardComponent,
    LendBookFormComponent,
    MemberSearchComponent,
    MemberListComponent,
    BookTagItemComponent,
    BookTagAuthComponent,
    BookTagUserComponent,
    AddTagComponent,
    SeriesAuthComponent,
    SeriesItemAuthComponent,
    MemberDetailsComponent,
    MemberDetailsAboutComponent,
    MemberDetailsBooksComponent,
    MemberDetailsPaymentsComponent,
    SeriesDetailsComponent,
    SeriesBookItemComponent,
    BooksSeriesFormComponent,
    AddBookToSeriesComponent,
    AddBookItemComponent,
    HomepageUserLibrariesComponent,
    HomepageUserBooksComponent,
    LibrarySearchListComponent,
    LibrarySearchMapComponent,
    DatePickerComponent,
    CheckAvailabilityComponent,
    CheckAvailabilityAuthComponent,
    RegisterLendingComponent,
    RegisterLendingUsersComponent,
    RegisterLendingBooksComponent,
    RegisterLendingSummaryComponent,
    LandingPageUserComponent,
    LandingPageLibrarianComponent,
    LandingPageHowLibrarianComponent,
    LandingPageHowUserComponent,
    SendNotificationComponent,
    NotificationListComponent
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAiQsIqvF94TLGTolB0U3fmGSUKwBcstFU',
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [HttpConfig.serverDomain],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
