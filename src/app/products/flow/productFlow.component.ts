import { Component, Input, OnInit, Pipe, PipeTransform   }  from '@angular/core';
import { ProductsInterface } from './../productsInterface.component';
import {Router} from '@angular/router';
import { NgClass } from '@angular/common';
import {NgModel} from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser';
//formBuilder component n stuff
import { config, defaultI18n, defaultOptions } from "./../../formbuilder/config";
import { FormBuilderCreateor } from "./../../formbuilder/form-builder";
import I18N from "./../../formbuilder/mi18n";
declare var window: any;
const options = {
  controlPosition: 'left',
  dataType: 'json',
  disableFields: ['autocomplete','hidden','header','paragraph','button'],
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
@Pipe({name: 'safeHtml'})
export class ProductsNewFlowComponent implements ProductsInterface{
  constructor(private router: Router, private sanitizer:DomSanitizer){
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
  public formElements: any;
  public preview : boolean = false;
  ngOnInit(): void {
    initJq();
    setTimeout(()=>{
      this.formBuilder = (<any>jQuery('.shittyStuff-0')).formBuilder(options);
      this.fuckOff()
    },250)
    setTimeout(()=>{
      document.getElementsByClassName('form-builder')[1].remove()
    },300)
  }
  customTrackBy(index: number, obj: any): any {
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
  getComponent(v){
    let type = v.type
    let required = v.required === true ?`<span class="fb-required">*</span>` : ''
    let tooltip = v.description !== null ? '' : `<span class="tooltip-element" tooltip="${v.description}">?</span>`
    const component = {
      'text': ()=>{
        return `  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        ${required}${tooltip}
          <input class="mdl-textfield__input ${v.className || ''}" type="${v.subtype}" name="${v.name || ''}" value="${v.value || ''}" maxlength="${v.maxlength || ''}" id="${v.name || ''}"  required="${v.required || false}" aria-required="${v.required || false}" id="${v.name}">
          <label class="mdl-textfield__label" for="${v.name}">${v.placeholder || 'sin titulo de campo'}</label>
        </div>`
      },
      'textarea': ()=>{
        return `  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <textarea class="mdl-textfield__input ${v.className || ''}" type="${v.subtype}" matInput name="${v.name || ''}" maxlength="${v.maxlength || ''}" value="${v.value || ''}" rows="${v.rows || ''}" id="${v.name || ''}" required="${v.required || false}" aria-required="${v.required || false}" ></textarea>
      <label class="mdl-textfield__label" for="${v.name}">${v.placeholder || ''}</label>
      </div>`
      },
      'select': () =>{
        let options = v.values.map((o,i)=>{
          return `<option value="${o.value || ''}" id="${v.name}-${i}">${o.label || ''}</option>`
        })
        return `
        <div class="mdlext-selectfield mdlext-js-selectfield">
            ${required}${tooltip}
                <select class="mdlext-selectfield__select ${v.className || ''}"   name="${v.name || ''}" id="${v.name || ''}" required="${v.required || ''}" aria-required="${v.required || ''}">
                <option value=""></option>
                ${options}
                </select>
                <label for="some-id" class="mdlext-selectfield__label">${v.placeholder || ''}</label>
              </div>`
      },
      'radio-group': () =>{
        let options = v.values.map((o,i)=>{
          return `<label class="mdl-radio mdl-js-radio mdl-js-ripple-effect ${v.className || ''}" for="${v.name}-${i}">
                    <input type="radio" id="${v.name}-${i}" class="mdl-radio__button" name="${v.name}-${i}" value="${o.value || ''}" checked="${o.selected || false}">
                    <span class="mdl-radio__label">${o.label || ''}</span>
                  </label>`
        })
        return `
        <section>
        ${required}${tooltip}
        <strong>${v.placeholder || ''}</strong>
          ${options}
        </section>`
      },
      'number':()=>{
        return `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
       ${required}${tooltip}
         <input class="mdl-textfield__input ${v.className || ''}" type="number" name="${v.name || ''}" value="${v.value || ''}" min="${v.min || ''}" max="${v.max || ''}" id="${v.name || ''}"  required="${v.required || false}" aria-required="${v.required || false}" id="${v.name}">
         <label class="mdl-textfield__label" for="${v.name}">${v.placeholder || ''}</label>
       </div>`
      },
      'file':()=>{
        return `<br/><div class="fileUpload"><input type="file"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cargar archivo</button><span><i class="material-icons mdl-list__item-icon">file_upload</i>cargar archivo</span></input></div><br/>`
      },
      'date':()=>{
        return `<br/><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored calendar-btn">Calendar <input type="date" class="datePickerHidden"/> </button><br/>`
      },
      'checkbox-group':()=>{
        let options = v.values.map((o,i)=>{
          return `<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="${v.name}-${i}">
          <input type="checkbox" id="${v.name}-${i}" class="mdl-checkbox__input" value="${o.value || ''}" checked="${o.selected || false}">
          <span class="mdl-checkbox__label">${o.label || ''}</span>
        </label>`
        })
        return `
            <section id="${v.name || ''}" class="${v.className || ''}">
            ${required}${tooltip}
            <label>${v.label}</label>
              ${options}
            </section>
        `
      },
      'default':()=>{
        console.log('elemento no planteado')
      }
    }

    return (component[type] || component['default'])()
  }
  showPreview(){
    var data = []
    JSON.parse(JSON.parse(localStorage.getItem('preview'))).map((v,i)=>{
      data.push(this.getComponent(v))
    })
    this.formElements = this.sanitizer.bypassSecurityTrustHtml(data.join().replace(/,/g , " "))
    setTimeout(()=>{
      /* tslint:disable */
        window.componentHandler.upgradeDom()
      /* tslint:enable */
    },500)
    this.toglePreview()
  }
  toglePreview(){
    console.log('toggle preview')
    this.preview = this.preview ? false : true;
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
