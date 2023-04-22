import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LibraryService } from '../../../../core/http/library.service';
import { MembershipService } from '../../../../core/http/membership.service';
import { Membership } from '../../../../data/interfaces/Membership';
import { MembershipOffer } from '../../../../data/interfaces/MembershipOffer';
import { PaymentListVM } from '../../../../data/interfaces/Payment';
import { getFormattedDateTime } from '../../../../helpers/getFormattedDate';

@Component({
  selector: 'app-member-details-payments',
  templateUrl: './member-details-payments.component.html',
  styleUrls: ['./member-details-payments.component.css'],
})
export class MemberDetailsPaymentsComponent implements OnInit {
  @Input() payments: PaymentListVM[] = [];
  @Input() subscriptionOfferId: number = -1;
  @Input() membershipId: number = -1;

  @Output() onRegisterPayment: EventEmitter<Membership> =
    new EventEmitter<Membership>();

  registerPayment: boolean = false;

  offers: MembershipOffer[] = [];
  offersLoading: boolean = false;

  constructor(
    private libraryService: LibraryService,
    private membershipService: MembershipService
  ) {}

  ngOnInit(): void {}

  formatDate(date: Date) {
    return getFormattedDateTime(date);
  }

  setRegisterPayment(option: boolean) {
    this.registerPayment = option;

    if (option) {
      this.offersLoading = true;
      this.libraryService.getOffersForLibrarian().subscribe(
        (res) => {
          this.offers = res;
          this.offersLoading = false;
          console.log(this.offers);
        },
        (err) => {
          alert('Greška pri učitavanju ponuda za članstvo!');
          this.offersLoading = false;
        }
      );
    }
  }

  extendMembership(offerId: number) {
    console.log(this.membershipId);
    this.membershipService
      .registerPayment(offerId, this.membershipId)
      .subscribe((res) => {
        this.onRegisterPayment.emit(res);
        alert('Uspješno evidentirana uplata!');
      });
  }
}
