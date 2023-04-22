import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LibraryService } from '../../../../../core/http/library.service';
import {
  MembershipOffer,
  MembershipOfferUpdateVM,
} from '../../../../../data/interfaces/MembershipOffer';
import { MembershipOfferType } from '../MembershipOfferType';

@Component({
  selector: 'app-membership-offer-auth',
  templateUrl: './membership-offer-auth.component.html',
  styleUrls: [
    './membership-offer-auth.component.css',
    '../membership-offer.component.css',
    '../membership-offer-create/membership-offer-create.component.css',
  ],
})
export class MembershipOfferAuthComponent implements OnInit {
  @Input() offer: MembershipOffer = new MembershipOffer();
  @Output() onDelete: EventEmitter<MembershipOffer> = new EventEmitter();
  @Output() onUpdate: EventEmitter<MembershipOffer> = new EventEmitter();

  offerEdit: MembershipOfferUpdateVM = new MembershipOfferUpdateVM();
  editing: boolean = false;
  submitLoading: boolean = false;

  constructor(private libraryService: LibraryService) {}

  getMembershipOfferType(): typeof MembershipOfferType {
    return MembershipOfferType;
  }

  ngOnInit(): void {
    this.offerEdit = this.offer;
  }

  remove() {
    if (
      confirm(`Jeste li sigurni da želite ukloniti ponudu ${this.offer.title}`)
    ) {
      this.libraryService.removeOffer(this.offer.id).subscribe((res) => {
        this.onDelete.emit(this.offer);
      });
    }
  }

  update() {
    if (this.validateFields()) {
      this.submitLoading = true;

      this.libraryService.updateOffer(this.offer.id, this.offerEdit).subscribe(
        (res) => {
          this.submitLoading = false;
          this.editing = false;
          this.onUpdate.emit(this.offer);
        },
        (err) => {
          this.submitLoading = false;
        }
      );
    }
  }

  setEditing(option: boolean) {
    this.editing = option;
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
