import { Component, Input  }  from '@angular/core';
import { ProductsInterface } from './../productsInterface.component';
import {Router} from '@angular/router';

@Component({
  templateUrl:'./productFlow.component.html',
  styleUrls: ['./productFlow.component.scss']
})
export class ProductsNewFlowComponent implements ProductsInterface{
  constructor(private router: Router){}
  @Input() data: any;
  visible: boolean = true;
selectable: boolean = true;
removable: boolean = true;
addOnBlur: boolean = true;
public input3Moment: any;
  fruits = [
    { name: 'Flujo 1',color:'primary' },
  ];
  foods = [
    {value: 'steak-0', viewValue: 'Ejecutivo'},
    {value: 'pizza-1', viewValue: 'Externo'},
  ];

      public moment: Date = new Date();

      public min = new Date(2017, 7, 9);
      public max = new Date(2017, 8, 10);
      public disabledDates = [new Date(2017, 7, 9),
          new Date(2017, 7, 12), new Date(2017, 7, 15), new Date(2017, 7, 20)];

      public pickerColor: string = '#0070ba';
}
