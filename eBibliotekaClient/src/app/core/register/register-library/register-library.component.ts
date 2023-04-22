import { Component, OnInit } from '@angular/core';
import { FieldType } from 'src/app/data/enums/FieldType';
import {
  RegisterLibrarianVM,
  GetLibrarianVM,
} from 'src/app/data/interfaces/Librarian';
import { AuthService } from '../../auth/auth.service';
import { ValidationService } from '../../validation/validation.service';

@Component({
  selector: 'app-register-library',
  templateUrl: './register-library.component.html',
  styleUrls: [
    './register-library.component.css',
    './../register-user/register-user.component.css',
  ],
})
export class RegisterLibraryComponent implements OnInit {
  loading: boolean;
  usernameLoading: boolean;
  usernameValid: boolean;
  step: number;

  librarian: RegisterLibrarianVM;

  repeatPassword: string;
  errors: {
    email: string[];
    username: string[];
    password: string[];
    repeatPassword: string[];
    libraryName: string[];
  } = {
    email: [],
    username: [],
    password: [],
    repeatPassword: [],
    libraryName: [],
  };

  constructor(
    private authService: AuthService,
    private validationService: ValidationService
  ) {
    this.step = 1;
    this.loading = false;
    this.usernameLoading = false;
    this.usernameValid = false;

    this.librarian = {
      email: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      libraryName: '',
    };
    this.repeatPassword = '';
  }

  ngOnInit(): void {}

  onSubmit() {}

  registerUser() {
    console.log(this.librarian);
    this.loading = true;

    this.authService.librarianRegister(this.librarian).subscribe(
      (librarian: GetLibrarianVM) => {
        this.loading = false;

        this.authService
          .librarianLogin({
            username: this.librarian.username,
            password: this.librarian.password,
          })
          .subscribe((res) => {
            const token = (<any>res).token;
            localStorage.setItem('jwt', token);
            window.location.reload();
          });
      },
      (res) => {
        alert(res.error);
        this.loading = false;
      }
    );
  }

  /* KORACI */

  nextStep() {
    if (
      this.step === 1 &&
      this.librarian.email !== '' &&
      this.librarian.username !== '' &&
      this.usernameValid
    ) {
      if (this.errors.username.length === 0 && this.errors.email.length === 0) {
        this.step++;
      }
    } else if (
      this.step === 2 &&
      this.librarian.firstName !== '' &&
      this.librarian.lastName !== ''
    ) {
      // nema validacije
      this.step++;
    } else if (
      this.step === 3 &&
      this.librarian.password !== '' &&
      this.repeatPassword !== ''
    ) {
      if (
        this.errors.password.length === 0 ||
        this.errors.repeatPassword.length === 0
      ) {
        this.step++;
      }
    } else if (this.librarian.libraryName !== '') {
      if (this.errors.libraryName.length === 0) {
        this.registerUser();
      }
    }
  }

  prevStep() {
    if (this.step != 1) this.step--;
  }

  /* VALIDACIJA */

  emailChange() {
    this.validationService
      .validateField(FieldType.Email, this.librarian.email)
      .subscribe((messages) => (this.errors.email = messages));
  }

  usernameChange() {
    this.usernameLoading = true;
    this.usernameValid = false;

    this.validationService
      .validateField(FieldType.Username, this.librarian.username)
      .subscribe(
        (messages) => {
          this.errors.username = messages;
          if (messages.length === 0) {
            this.authService
              .librarianCheckUsername(this.librarian.username)
              .subscribe(
                (res) => {
                  this.usernameLoading = false;
                  if (res === false) {
                    this.errors.username = [
                      'Uneseno korisničko ime je zauzeto!',
                    ];
                  } else {
                    this.usernameValid = true;
                  }
                },
                (err) => {
                  this.usernameLoading = false;
                }
              );
          }
        },
        (err) => {
          this.usernameLoading = false;
        }
      );
  }

  passwordChange() {
    this.validationService
      .validateField(FieldType.Password, this.librarian.password)
      .subscribe((messages) => (this.errors.password = messages));
  }

  repeatPasswordChange() {
    if (this.librarian.password !== this.repeatPassword) {
      this.errors.repeatPassword = ['Unesene lozinke nisu iste!'];
    } else {
      this.errors.repeatPassword = [];
    }
  }

  libraryNameChange() {
    this.validationService
      .validateField(FieldType.LibraryName, this.librarian.libraryName)
      .subscribe((messages) => (this.errors.libraryName = messages));
  }
}
