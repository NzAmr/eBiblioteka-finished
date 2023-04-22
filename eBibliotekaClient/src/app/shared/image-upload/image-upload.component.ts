import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpConfig } from '../../configs/HttpConfig';
import { Image } from '../../data/interfaces/Image';
import { ImageUploadOptions } from '../../data/types/ImageUploadOptions';
import { createImgPath } from '../../helpers/CreateImgPath';
import { getFormattedDate } from '../../helpers/getFormattedDate';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent implements OnInit {
  @Output() onCloseOverlay: EventEmitter<null> = new EventEmitter();
  @Output() onUploadSuccess: EventEmitter<Image> = new EventEmitter();
  @Input() options: ImageUploadOptions;

  uploading: boolean = false;
  fileToUpload: File | null = null;
  progress: number = 0;

  constructor(private http: HttpClient) {
    document.getElementsByTagName('body')[0].classList.add('stop-scrolling');
    this.options = new ImageUploadOptions();
  }

  ngOnInit(): void {
    console.log(this.options);
  }

  closeOverlay() {
    document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');

    this.onCloseOverlay.emit();
  }

  GetCurrentPath() {
    if (this.options.currentImage) {
      return createImgPath(this.options.currentImage.path);
    }
    return '';
  }

  GetCurrentFileName() {
    if (this.options.currentImage) {
      var splitString = this.options.currentImage.path.split(/\\/g);
      return splitString[splitString.length - 1];
    }
    return '';
  }

  GetCurrentDate() {
    if (this.options.currentImage) {
      return getFormattedDate(this.options.currentImage.createdAt);
    }
    return '';
  }

  onFileChange(files: FileList | null) {
    if (files) {
      this.fileToUpload = files[0];
    } else {
      this.fileToUpload = null;
    }
  }

  uploadImage() {
    if (this.fileToUpload === null) return;

    this.uploading = true;

    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);

    this.http
      .post(this.options.url, formData, {
        responseType: 'text' as 'json',
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(
              (100 * event.loaded) / <number>event.total
            );
          } else if (event.type === HttpEventType.Response) {
            this.fileToUpload = null;
            this.options.currentImage = JSON.parse(<string>event.body);
            this.onUploadSuccess.emit(this.options.currentImage);
            this.uploading = false;
          }
        },
        (err) => {
          this.uploading = false;
        }
      );
  }

  removeImage() {
    if (this.options.currentImage === null) return;

    this.http.delete(this.options.url).subscribe(
      (res) => {
        console.log(res);
        this.options.currentImage = undefined;
        this.onUploadSuccess.emit(undefined);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
