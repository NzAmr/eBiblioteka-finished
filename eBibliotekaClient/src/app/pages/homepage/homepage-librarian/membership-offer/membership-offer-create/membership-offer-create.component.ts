import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LibraryService } from '../../../../../core/http/library.service';
import {
  MembershipOffer,
  MembershipOfferCreateVM,
} from '../../../../../data/interfaces/MembershipOffer';

@Component({
  selector: 'app-membership-offer-create',
  templateUrl: './membership-offer-create.component.html',
  styleUrls: [
    './membership-offer-create.component.css',
    '../membership-offer.component.css',
  ],
})
export class MembershipOfferCreateComponent implements OnInit {
  @Output() onSubmit: EventEmitter<MembershipOffer> = new EventEmitter();

  offer: MembershipOfferCreateVM = new MembershipOfferCreateVM();
  submitLoading: boolean = false;

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {}

  submit() {
    if (this.validateFields()) {
      this.submitLoading = true;
      this.libraryService.addOffer(this.offer).subscribe(
        (res) => {
          this.submitLoading = false;
          this.onSubmit.emit(res);
        },
        (res) => {
          this.submitLoading = false;
          alert('Greska');
        }
      );
    }
  }

  validateFields(): boolean {
    let errors = '';

    if (this.offer.title.length < 3) {
      errors += '\n Naslov mora sadržavati najmanje 3 karaktera.';
    }

    if (this.offer.description.length < 3) {
      errors += '\n Opis mora sadržavati najmanje 3 karaktera.';
    }

    if (this.offer.noOfBooks < 1) {
      errors += '\n Broj knjiga ne smije biti manji od 1.';
    }

    if (this.offer.addedMonths < 1) {
      errors += '\n Trajanje ne smije biti manji od 1.';
    }

    if (this.offer.price < 1) {
      errors += '\n Cijena ne smije biti manji od 1.';
    }

    if (errors.length > 0) {
      alert(errors);
      return false;
    } else {
      return true;
    }
  }
}
