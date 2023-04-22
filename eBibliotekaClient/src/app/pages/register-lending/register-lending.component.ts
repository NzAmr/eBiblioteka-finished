import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-register-lending',
  templateUrl: './register-lending.component.html',
  styleUrls: ['./register-lending.component.css'],
})
export class RegisterLendingComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  bookId: number | undefined = -1;
  memberId: number | undefined = -1;

  currentStep: number = 1;
  stepText: string = 'Učitavanje...';

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.bookId = params['bookId'];
      this.memberId = params['memberId'];

      this.wizardCycle();
    });
  }

  selectUser(id: number) {
    const queryParams: Params = { bookId: this.bookId, memberId: id };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }

  selectBook(id: number) {
    const queryParams: Params = { bookId: id, userId: this.memberId };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }

  wizardCycle() {
    if (this.bookId == undefined && this.memberId == undefined) {
      this.currentStep = 1;
      this.stepText = 'Izaberite knjigu';
    } else if (this.bookId == undefined && this.memberId) {
      this.currentStep = 2;
      this.stepText = 'Izaberite knjigu';
    } else if (this.bookId && this.memberId == undefined) {
      this.currentStep = 2;
      this.stepText = 'Izaberite člana';
    } else {
      this.currentStep = 3;
      this.stepText = 'Pregled';
    }
  }
}
