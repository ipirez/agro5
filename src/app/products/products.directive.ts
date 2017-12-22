import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[steep-host]',
})
export class ProductsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {  }
}
