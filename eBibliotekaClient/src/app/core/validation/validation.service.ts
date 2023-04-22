import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FieldType, ValidationFunc } from 'src/app/data/enums/FieldType';
import { validationOptions } from './validationOptions';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  options: Record<FieldType, ValidationFunc> = validationOptions;

  constructor() {}

  validateField(field: FieldType, input: string): Observable<string[]> {
    return of(this.options[field](input));
  }
}
