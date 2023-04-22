import { Component, OnInit } from '@angular/core';
import { FieldType } from '../../../data/enums/FieldType';
import { CreateUserVM, User } from '../../../data/interfaces/User';
import { AuthService } from '../../auth/auth.service';
import { ValidationService } from '../../validation/validation.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  loading: boolean;
  usernameLoading: boolean;
  usernameValid: boolean;
  step: number;

  user: CreateUserVM;

  repeatPassword: string;
  errors: {
    email: string[];
    username: string[];
    password: string[];
    repeatPassword: string[];
  } = {
    email: [],
    username: [],
    password: [],
    repeatPassword: [],
  };

  constructor(
    private authService: AuthService,
    private validationService: ValidationService
  ) {
    this.step = 1;
    this.loading = false;
    this.usernameLoading = false;
    this.usernameValid = false;

    this.user = {
      email: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    };
    this.repeatPassword = '';
  }

  ngOnInit(): void {}

  onSubmit() {}

  registerUser() {
    console.log(this.user);
    this.loading = true;

    this.authService.userRegister(this.user).subscribe(
      (user: User) => {
        this.loading = false;

        this.authService
          .userLogin({
            username: this.user.username,
            password: this.user.password,
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
      this.user.email !== '' &&
      this.user.username !== '' &&
      this.usernameValid
    ) {
      if (this.errors.username.length === 0 && this.errors.email.length === 0) {
        this.step++;
      }
    } else if (
      this.step === 2 &&
      this.user.firstName !== '' &&
      this.user.lastName !== ''
    ) {
      // nema validacije
      this.step++;
    } else if (this.user.password !== '' && this.repeatPassword !== '') {
      if (
        this.errors.password.length === 0 ||
        this.errors.repeatPassword.length === 0
      ) {
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
      .validateField(FieldType.Email, this.user.email)
      .subscribe((messages) => (this.errors.email = messages));
  }

  usernameChange() {
    this.usernameLoading = true;
    this.usernameValid = false;

    this.validationService
      .validateField(FieldType.Username, this.user.username)
      .subscribe((messages) => {
        this.errors.username = messages;
        if (messages.length === 0) {
          this.authService.userCheckUsername(this.user.username).subscribe(
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
      });
  }

  passwordChange() {
    this.validationService
      .validateField(FieldType.Password, this.user.password)
      .subscribe((messages) => (this.errors.password = messages));
  }

  repeatPasswordChange() {
    if (this.user.password !== this.repeatPassword) {
      this.errors.repeatPassword = ['Unesene lozinke nisu iste!'];
    } else {
      this.errors.repeatPassword = [];
    }
  }
}
