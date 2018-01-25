import { Component, Input, OnInit, Pipe, PipeTransform }  from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NgClass } from '@angular/common';
import {NgModel} from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material';
//formBuilder component n stuff
import { config, defaultI18n, defaultOptions } from "./../formbuilder/config";
import { FormBuilderCreateor } from "./../formbuilder/form-builder";
import I18N from "./../formbuilder/mi18n";
import {getComponent} from './viewBuilder'
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
export class ProductsNewFlowComponent implements OnInit {
  constructor(private router: Router, private sanitizer:DomSanitizer, private activatedRoute: ActivatedRoute, public http: HttpClient, public snackBar: MatSnackBar){
  }
  public productName : string = 'unknow'
  public formBuilder: any;
  public flux : number = 1;
  public fluxArr = Array;
  public steepsArr = Array;
  public steep  = [1];
  public selected : number = 0;
  public formElements: any;
  public preview : boolean = false;
  public sla : boolean = false
  public timeStandar : number = 0;
  public dataModel : Object
  public loading : boolean = false
  foods = [
    {value: '01', viewValue: 'Ejecutivo'},
    {value: '02', viewValue: 'Aseguradora'},
  ];
  ngOnInit(): void {
    initJq();
    this.activatedRoute.params.subscribe(params => {
      this.http.get('https://products-mxagrocompara1-dev.appls.cto1.paas.gsnetcloud.corp/product/'+params.id,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') })
          .subscribe(data => {
            this.dataModel = data
            this.productName = data['name']
            this.toggleLoading()
          }, err=>{
            //NOTE: BORRAR ESTA LINEA PARA PRODUCCION
            this.toggleLoading()
            this.snackBar.open(err.message, '', { duration: 1500 })
          });
      });
    }
    //disable login spinner and start dinamic form builder
    toggleLoading(){
      //this.loading = this.loading ? false : true
      initJq();
      setTimeout(()=>{
        this.formBuilder = (<any>jQuery('.flux-0.dynamicForm-0')).formBuilder(options);
        setTimeout(()=>{
          jQuery('.cb-wrap ul').addClass('mdl-list')
        },200)
      },250)
    }
    //remove flux
    remove(index){
      console.log(this.fluxArr[])
      console.log()
      //this.fluxArr = this.fluxArr.filter(obj => obj !== this.fluxArr[index]);
    }
    //timepicker
    timePicker(e){
      this.sla = e.checked
      this.timeStandar = 0
    }
    //change flux page
    chipClick(index){
      this.selected = index;
    }
    //add other Flux
    addFlux(){
      let number = this.flux
      number++
      this.flux = number;
    }
    //add step to the flux
    addStep(index){
      if(!this.steep[index]){
        this.steep[index] = 1
      }
      let steep = this.steep[index]
      steep++
      this.steep[index] = steep
    }
    //showPreview stuff
    showPreview(){
      var data = []
      JSON.parse(this.formBuilder.formData).map((v,i)=>{
        data.push(getComponent(v))
      })
      this.formElements = this.sanitizer.bypassSecurityTrustHtml(data.join().replace(/,/g , " "))
      setTimeout(()=>{
          window.componentHandler.upgradeDom()
      },500)
      this.toglePreview()
    }
    //swtich between screens
    toglePreview(){
      this.preview = this.preview ? false : true;
    }
    //save complete form
    save(){
      this.dataModel = {
        ...this.dataModel,
        stages: [
          {
            maximumHoursSLA: 0,
            name: 'string',
            order: 0,
            rolId: 'string',
            works: [
              {
                name: 'string',
                order: 0,
                templateForm:  JSON.parse(this.formBuilder.formData)
              }
            ]
          }
        ]
      }
      this.http.patch('https://products-mxagrocompara1-dev.appls.cto1.paas.gsnetcloud.corp/product',
          JSON.stringify(this.dataModel), { headers: new HttpHeaders().set('Content-Type', 'application/json') })
          .subscribe(data => {
              console.log(data)
              this.snackBar.open('Producto guardado.', '', { duration: 1500 })
          });
    }
  }
