import { HttpHeaders } from '@angular/common/http';

export class HttpConfig {
  //static serverAdress = 'https://api.p2121.app.fit.ba/';
  static serverAdress = 'https://localhost:44332/';
  //static serverDomain = 'api.p2121.app.fit.ba';
  static serverDomain = 'localhost:44332';

  static httpsOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  static EndPoints = {
    user: {
      register: `${this.serverAdress}api/user/register`,
      login: `${this.serverAdress}api/user/login`,
      usernameCheck: `${this.serverAdress}api/user/username-check`,
      account: `${this.serverAdress}api/user/account`,
      profileImg: `${this.serverAdress}api/user/profileImage`,
      updatePassword: `${this.serverAdress}api/user/update-password`,
    },
    librarian: {
      register: `${this.serverAdress}api/librarian/register`,
      login: `${this.serverAdress}api/librarian/login`,
      usernameCheck: `${this.serverAdress}api/librarian/username-check`,
      libraryId: `${this.serverAdress}api/librarian/libraryId`,
      account: `${this.serverAdress}api/librarian/account`,
      profileImg: `${this.serverAdress}api/librarian/profileImage`,
      updatePassword: `${this.serverAdress}api/librarian/update-password`,
      bookAuthCheck: `${this.serverAdress}api/auth/book-auth-check/`,
      seriesAuthCheck: `${this.serverAdress}api/Auth/series-auth-check/`,
    },
    library: {
      search: `${this.serverAdress}api/library/search`,
      searchMap: `${this.serverAdress}api/library/search-map`,
      details: `${this.serverAdress}api/library/`,
      update: `${this.serverAdress}api/library/`,
      banner: `${this.serverAdress}api/library/banner`,
      profileImg: `${this.serverAdress}api/library/profileImage`,
      membershipOffers: `${this.serverAdress}api/library/offers/`,
      businessHours: `${this.serverAdress}api/library/business-hours/`,
      forUser: `${this.serverAdress}api/library/for-user/`,
      detailsForMap: `${this.serverAdress}api/library/details/map/`,
      sendNotification: `${this.serverAdress}api/library/send-notification`,
      getNotification: `${this.serverAdress}api/library/get-notification`,
      getNotificationsForUser: `${this.serverAdress}api/library/get-notifications-for-user`,
      removeNotification: `${this.serverAdress}api/library/remove-notification`,
    },
    author: {
      search: `${this.serverAdress}api/author/search`,
      get: `${this.serverAdress}api/author/`,
      update: `${this.serverAdress}api/author/update/`,
      add: `${this.serverAdress}api/author/`,
      delete: `${this.serverAdress}api/author/remove/`,
    },
    book: {
      get: `${this.serverAdress}api/book/`,
      add: `${this.serverAdress}api/book/`,
      search: `${this.serverAdress}api/book/search`,
      userSearch: `${this.serverAdress}api/book/usersearch`,
      librarianListSearch: `${this.serverAdress}api/Book/search-librarian-list`,
      update: `${this.serverAdress}api/book/update/`,
      canLend: `${this.serverAdress}api/book/can-lend/`,
      lend: `${this.serverAdress}api/book/lend/`,
      lentBooksForUser: `${this.serverAdress}api/book/lent-books-user/`,
      coverImage: `${this.serverAdress}api/book/cover-image/`,
      forUser: `${this.serverAdress}api/book/for-user/`,
      lentBooks: `${this.serverAdress}api/book/lent-books/`,
      registerReturn: `${this.serverAdress}api/book/register-return/`,
      registerLending: `${this.serverAdress}api/book/register-lending`,
      registerLendingSummary: `${this.serverAdress}api/book/register-lending-summary`,
      getRecommendationsLibrarian: `${this.serverAdress}api/book/get-recommendations-for-librarian`,
      getRecommendationsUser: `${this.serverAdress}api/book/get-recommendations-by-library`,
      addRecommendation:`${this.serverAdress}api/book/add-book-to-recommendations`,
      getRecommendationsId: `${this.serverAdress}api/book/get-recommendations-id`,
      deleteRecommendation: `${this.serverAdress}api/book/remove-book-from-recommendations`,
    },
    membership: {
      create: `${this.serverAdress}api/membership/`,
      searchMembers: `${this.serverAdress}api/membership/search-members`,
      details: `${this.serverAdress}api/membership/details/`,
    },
    tag: {
      getTag: `${this.serverAdress}api/Book/get-tag`,
      addTag: `${this.serverAdress}api/Book/add-tag`,
      getTags: `${this.serverAdress}api/Book/get-tags-by-book/`,
      delete: `${this.serverAdress}api/Book/removeTag/`,
    },
    series: {
      getSeriesLibrarian: `${this.serverAdress}api/Book/get-series-librarian/`,
      createSeries: `${this.serverAdress}api/Book/create-series`,
      getBooksBySeries: `${this.serverAdress}api/Book/get-books-by-series/`,
      getSeriesByBook: `${this.serverAdress}api/Book/get-series-by-book/`,
      addBookToSeries: `${this.serverAdress}api/Book/add-book-to-series/`,
      removeBookFromSeries: `${this.serverAdress}api/Book/remove-book-from-series/`,
    },
    location: {
      addLocationLibrary: `${this.serverAdress}api/location/library/`,
    },
    getAccountType: `${this.serverAdress}api/auth/user-type`,
  };
}
