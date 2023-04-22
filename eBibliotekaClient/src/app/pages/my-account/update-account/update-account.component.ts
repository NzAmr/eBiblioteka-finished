import { Component, Input, OnInit } from '@angular/core';
import { AccountType } from 'src/app/data/enums/AccountType';
import { AuthService } from '../../../core/auth/auth.service';
import { AccountService } from '../../../core/http/account.service';
import { ValidationService } from '../../../core/validation/validation.service';
import { FieldType } from '../../../data/enums/FieldType';
import { Account, AccountUpdateVM } from '../../../data/interfaces/Account';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css', '../my-account.component.css'],
})
export class UpdateAccountComponent implements OnInit {
  @Input() account: Account;
  @Input() accountType: AccountType = AccountType.User;
  accountEdit: AccountUpdateVM;

  editingInfo: boolean = false;
  editingInfoLoading: boolean = false;

  loading: boolean;
  usernameLoading: boolean;
  usernameValid: boolean;

  errors: {
    email: string[];
    username: string[];
  } = {
    email: [],
    username: [],
  };

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private validationService: ValidationService
  ) {
    this.account = new Account();
    this.accountEdit = new Account();

    this.loading = false;
    this.usernameLoading = false;
    this.usernameValid = false;
  }

  ngOnInit(): void {}

  setAccountEdit(data: Account) {
    this.accountEdit.email = data.email;
    this.accountEdit.username = data.username;
    this.accountEdit.firstName = data.firstName;
    this.accountEdit.lastName = data.lastName;
  }

  setEditingInfo(option: boolean) {
    this.editingInfo = option;

    this.setAccountEdit(this.account);
  }

  updateInfo() {
    if (!this.formIsValid()) return;

    this.editingInfoLoading = true;

    if (this.accountType === AccountType.User) {
      this.accountService.userUpdateAccount(this.accountEdit).subscribe(
        (res) => {
          this.account = res;
          this.setEditingInfo(false);
          this.editingInfoLoading = false;
          alert('Uspjesno izmjenjene informacije o profilu!');
        },
        (err) => {
          this.setEditingInfo(false);
          this.editingInfoLoading = false;
        }
      );
    } else {
      this.accountService.librarianUpdateAccount(this.accountEdit).subscribe(
        (res) => {
          this.account = res;
          this.setEditingInfo(false);
          this.editingInfoLoading = false;
          alert('Uspjesno izmjenjene informacije o profilu!');
        },
        (err) => {
          this.setEditingInfo(false);
          this.editingInfoLoading = false;
        }
      );
    }
  }

  emailChange() {
    this.validationService
      .validateField(FieldType.Email, this.accountEdit.email)
      .subscribe((messages) => (this.errors.email = messages));
  }

  usernameChange() {
    if (this.accountEdit.username === this.account.username) return;

    this.usernameLoading = true;
    this.usernameValid = false;

    this.validationService
      .validateField(FieldType.Username, this.accountEdit.username)
      .subscribe((messages) => {
        this.errors.username = messages;
        if (messages.length === 0) {

          if (this.accountType === AccountType.User) {

          this.authService
            .userCheckUsername(this.accountEdit.username)
            .subscribe(
              (res) => {
                this.usernameLoading = false;
                if (res === false) {
                  this.errors.username = ['Uneseno korisničko ime je zauzeto!'];
                } else {
                  this.usernameValid = true;
                }
              },
              (err) => {
                this.usernameLoading = false;
              }
            );
          } else {
            this.authService
            .librarianCheckUsername(this.accountEdit.username)
            .subscribe(
              (res) => {
                this.usernameLoading = false;
                if (res === false) {
                  this.errors.username = ['Uneseno korisničko ime je zauzeto!'];
                } else {
                  this.usernameValid = true;
                }
              },
              (err) => {
                this.usernameLoading = false;
              }
            );
          }
        }
      });
  }

  formIsValid(): boolean {
    return (
      this.accountEdit.email !== '' &&
      this.accountEdit.username !== '' &&
      this.accountEdit.firstName !== '' &&
      this.accountEdit.lastName !== '' &&
      this.errors.username.length === 0 &&
      this.errors.email.length === 0
    );
  }
}
