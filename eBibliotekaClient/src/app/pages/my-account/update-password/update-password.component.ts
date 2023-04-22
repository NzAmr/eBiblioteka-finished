import { Component, Input, OnInit } from '@angular/core';
import { AccountType } from 'src/app/data/enums/AccountType';
import { AccountService } from '../../../core/http/account.service';
import { ValidationService } from '../../../core/validation/validation.service';
import { FieldType } from '../../../data/enums/FieldType';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css', '../my-account.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  @Input() accountType: AccountType = AccountType.User;

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  editingPassword: boolean = false;
  editingPasswordLoading: boolean = false;
  errors: {
    currentPassword: string[];
    newPassword: string[];
    confirmPassword: string[];
  } = {
    currentPassword: [],
    newPassword: [],
    confirmPassword: [],
  };

  constructor(
    private accountService: AccountService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {}

  setEditingPassword(option: boolean) {
    this.editingPassword = option;

    this.errors.currentPassword = [];
    this.errors.newPassword = [];
    this.errors.confirmPassword = [];

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  updatePassword() {
    this.editingPasswordLoading = true;

    if (
      this.newPassword !== '' &&
      this.currentPassword !== '' &&
      this.confirmPassword !== ''
    ) {
      if (
        this.errors.newPassword.length == 0 &&
        this.errors.confirmPassword.length == 0
      ) {

        if(this.accountType === AccountType.User) {
          this.accountService
            .userUpdatePassword({
              currentPassword: this.currentPassword,
              newPassword: this.newPassword,
            })
            .subscribe(
              (res) => {
                alert('Uspjesno izmjenjena lozinka');
                this.editingPasswordLoading = false;
              },
              (err) => {
                console.log(err);
                this.errors.currentPassword.push('Pogrešna trenutna lozinka!');
                this.editingPasswordLoading = false;
              }
            );
        } else {
          this.accountService
            .librarianUpdatePassword({
              currentPassword: this.currentPassword,
              newPassword: this.newPassword,
            })
            .subscribe(
              (res) => {
                alert('Uspjesno izmjenjena lozinka');
                this.editingPasswordLoading = false;
              },
              (err) => {
                console.log(err);
                this.errors.currentPassword.push('Pogrešna trenutna lozinka!');
                this.editingPasswordLoading = false;
              }
            );
        }

      }
    }
    this.editingPasswordLoading = false;
  }

  /* VALIDATION */

  currentPasswordChange() {
    this.errors.currentPassword = [];
  }

  passwordChange() {
    this.validationService
      .validateField(FieldType.Password, this.newPassword)
      .subscribe((messages) => (this.errors.newPassword = messages));
  }

  repeatPasswordChange() {
    if (this.newPassword !== this.confirmPassword) {
      this.errors.confirmPassword = ['Unesene lozinke nisu iste!'];
    } else {
      this.errors.confirmPassword = [];
    }
  }
}
