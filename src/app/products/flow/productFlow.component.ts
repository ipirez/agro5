import { Component, Input, OnInit  }  from '@angular/core';
import { ProductsInterface } from './../productsInterface.component';
import {Router} from '@angular/router';
//formBuilder component n stuff
import { config, defaultI18n, defaultOptions } from "./../../formbuilder/config";
import { FormBuilderCreateor } from "./../../formbuilder/form-builder";
import I18N from "./../../formbuilder/mi18n";
const options = {
  controlPosition: 'left',
  dataType: 'json',
  disableFields: ['autocomplete','hidden','header','paragraph','button'],
  //disabledAttrs: ['label'],
  showActionButtons: false,
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

ngOnInit(): void {
  initJq();
  this.formBuilder = (<any>jQuery('.build-wrap')).formBuilder(options);
  setTimeout(()=>{
    this.fuckOff()
  },200)
}
fuckOff(){
  jQuery('.cb-wrap ul').addClass('mdl-list')
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
