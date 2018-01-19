import { Component, Input, OnInit  }  from '@angular/core';
import { ProductsInterface } from './../productsInterface.component';
import {Router} from '@angular/router';
import { NgClass } from '@angular/common';
import {NgModel} from '@angular/forms'
//formBuilder component n stuff
import { config, defaultI18n, defaultOptions } from "./../../formbuilder/config";
import { FormBuilderCreateor } from "./../../formbuilder/form-builder";
import I18N from "./../../formbuilder/mi18n";
const options = {
  controlPosition: 'left',
  dataType: 'json',
  disableFields: ['autocomplete','hidden','header','paragraph','button'],
  //showActionButtons: false,
  stickyControls: {
    enable: true,
    offset: {
        position: 'absolute',
        top: 20,
        right: 20,
        left: 'auto'
    }
  }
}
function initJq() {
  (function ($) {
    (<any>$.fn).formBuilder = function (options) {
      if (!options) {
        options = {};
      }
      let elems = this;
      let {i18n, ...opts} = $.extend({}, defaultOptions, options, true);
      (<any>config).opts = opts;
      let i18nOpts = $.extend({}, defaultI18n, i18n, true);
      let instance = {
        actions: {
          getData: null,
          setData: null,
          save: null,
          showData: null,
          setLang: null,
          addField: null,
          removeField: null,
          clearFields: null
        },
        get formData() {
          return instance.actions.getData('json');
        },

        promise: new Promise(function (resolve, reject) {
          new I18N().init(i18nOpts).then(() => {
            elems.each(i => {
              let formBuilder = new FormBuilderCreateor().getFormBuilder(opts, elems[i]);
              $(elems[i]).data('formBuilder', formBuilder);
              instance.actions = formBuilder.actions;
            });
            delete instance.promise;
            resolve(instance);
          }).catch(console.error);
        })

      };
      return instance;
    };
  })(jQuery);
}
@Component({
  templateUrl:'./productFlow.component.html',
  styleUrls: ['./productFlow.component.scss'],
  providers: []
})
export class ProductsNewFlowComponent implements ProductsInterface{
  constructor(private router: Router){
  }
  @Input() data: any;
  visible: boolean = true;
selectable: boolean = true;
removable: boolean = true;
addOnBlur: boolean = true;
public input3Moment: any;
formBuilder: any;
public flux : number = 1;
public fluxArr = Array;
public steepsArr = Array;
public steep  = [1];
public selected : number = 0;
//public fluxName0 = 'huevos';
ngOnInit(): void {
  initJq();
  this.formBuilder = (<any>jQuery('.build-wrap')).formBuilder(options);
  setTimeout(()=>{
    this.fuckOff()
  },200)
}
customTrackBy(index: number, obj: any): any {
  console.log(index)
  return index;
}
chipClick(index){
  this.selected = index;
}
addSteep(){
  let number = this.flux
  number++
  this.flux = number;
}
addCard(index){
  if(!this.steep[index]){
    this.steep[index] = 1
  }
  let steep = this.steep[index]
  steep++
  this.steep[index] = steep
}
fuckOff(){
  jQuery('.cb-wrap ul').addClass('mdl-list')
}
remove(index){
  console.log(index)
  console.log(this.fluxArr[index])
  //this.fluxArr = this.fluxArr.filter(obj => obj !== this.fluxArr[index]);
}
trackByIndex(index: number, obj: any): any {
  return index;
}
  fruits = [
    { name: 'Flujo 1',color:'primary' },
  ];
  foods = [
    {value: 'steak-0', viewValue: 'Ejecutivo'},
    {value: 'pizza-1', viewValue: 'Aseguradora'},
  ];

      public moment: Date = new Date();

      public min = new Date(2017, 7, 9);
      public max = new Date(2017, 8, 10);
      public disabledDates = [new Date(2017, 7, 9),
      new Date(2017, 7, 12), new Date(2017, 7, 15), new Date(2017, 7, 20)];

      public pickerColor: string = '#0070ba';
}
