import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'show-errors',
  template: `
    <ul class="errorList" *ngIf="shouldShowErrors()">
      <li style="color: red" *ngFor="let error of listOfErrors()">{{error}}</li>
    </ul>
  `,
})
export class ShowErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'Este campo es requerido',
    'minlength': (params) => 'El minimo número de caracteres es ' + params.requiredLength,
    'maxlength': (params) => 'El máximo número de caracteres es ' + params.requiredLength,
    'pattern': (params) => 'El patron es: ' + params.requiredPattern,
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message,
    'imageWeight': (params) => params.message,
    'imageSize': (params) => params.message
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }

}
