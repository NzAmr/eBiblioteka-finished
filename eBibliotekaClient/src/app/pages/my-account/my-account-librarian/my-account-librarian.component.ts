import { Component, OnInit } from '@angular/core';
import { HttpConfig } from 'src/app/configs/HttpConfig';
import { AccountService } from 'src/app/core/http/account.service';
import { AccountType } from 'src/app/data/enums/AccountType';
import { Account } from 'src/app/data/interfaces/Account';
import { Image } from 'src/app/data/interfaces/Image';
import { ImageUploadOptions } from 'src/app/data/types/ImageUploadOptions';
import { createImgPath } from 'src/app/helpers/CreateImgPath';
import { getFormattedDate } from 'src/app/helpers/getFormattedDate';

@Component({
  selector: 'app-my-account-librarian',
  templateUrl: './my-account-librarian.component.html',
  styleUrls: ['./my-account-librarian.component.css', '../my-account.component.css']
})
export class MyAccountLibrarianComponent implements OnInit {
  account: Account;

  profileImgUploadOptions: ImageUploadOptions;
  showProfileImgUpload: boolean = false;

  constructor(private accountService: AccountService) {
    this.account = new Account();

    this.profileImgUploadOptions = {
      url: HttpConfig.EndPoints.librarian.profileImg,
      title: 'UREDI PROFILNU SLIKU',
      subtitle:
        'Za profilnu sliku se preporučuje slika u omjeru 1:1, sa minimalnom rezolucijom od 100x100.',
      currentImage: this.account.profilePicture,
    };
  }

  ngOnInit(): void {
    this.accountService.librarianGetAccount().subscribe((res) => {
      this.account = res;
      this.profileImgUploadOptions.currentImage = res.profilePicture;
      console.log(res);
    });
  }

  FormatDate(date: Date) {
    return getFormattedDate(date);
  }

  setShowProfileImgUpload(option: boolean) {
    this.showProfileImgUpload = option;
  }

  setProfileImg(profileImg: Image) {
    this.account.profilePicture = profileImg;
  }

  getProfileImagePath() {
    if (this.account.profilePicture) {
      return createImgPath(this.account.profilePicture.path);
    }
    return '';
  }

  public get getAccountType(): typeof AccountType {
    return AccountType;
  }
}
