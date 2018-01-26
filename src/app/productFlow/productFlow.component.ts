import { Component, Input, OnInit }  from '@angular/core';
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
export class ProductsNewFlowComponent implements OnInit {
  constructor(private router: Router, private sanitizer:DomSanitizer, private activatedRoute: ActivatedRoute, public http: HttpClient, public snackBar: MatSnackBar){
  }
  public fluxUser : string
  public productName : string = 'unknow'
  public formBuilder: any;
  public selected : number = 0;
  public formElements = [];
  public preview : boolean = false;
  public sla : boolean = false
  public dataModel : Object
  public loading : boolean = false
  public logicContent = [
    {
      'fluxName':'',
      'sla': 0,
      'userId': '',
      'userType': '',
      'steps':[
          {
          'name':'',
          'instance':{},
          'dinamicForm':''
        }
      ]
    }
  ]
  publicusersType = [
    {value: '2', viewValue: 'Ejecutivo'},
    {value: '3', viewValue: 'Aseguradora'},
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
      this.buildInstance(0,0)
      setTimeout(()=>{
          //this.formBuilder.actions.setData(this.dataModel['stages'][this.flux-1]['works'[0]]['templateForm'])
        },200)
    }
    buildInstance(flux,step){
      setTimeout(()=>{
        this.logicContent[flux].steps[step].instance = (<any>jQuery('.flux-'+flux+'.dynamicForm-'+step)).formBuilder(options)
      },250)
    }
    //setflux type member
    fluxType(a,i){
      switch(a.value){
        case '2':
          this.logicContent[i].userType = 'E'
        break;
        case '3':
          this.logicContent[i].userType = 'A'
        break;
      }
      this.logicContent[i].userId = a.value
    }
    //change step name
    stepName(value, i, ii){
      this.logicContent[i].steps[ii].name
    }
    //remove flux
    remove(index){
      //console.log(this.fluxArr[this.flux ])
      //console.log()
      //this.fluxArr = this.fluxArr.filter(obj => obj !== this.fluxArr[index]);
    }
    //timepicker
    timePicker(e,i){
      this.sla = e.checked
      this.logicContent[i].sla = 0
    }
    timeStandar(value,i){
      this.logicContent[i].sla = value
    }
    //change flux page
    chipClick(index){
      this.selected = index;
    }
    //add other Flux
    addFlux(){
      let flux = {
            'fluxName':'',
            'sla': 0,
            'userId': '',
            'userType': '',
            'steps':[
                {
                'name':'',
                'instance':{},
                'dinamicForm':''
              }
            ]
          }
      this.logicContent.push(flux)
      this.buildInstance(this.logicContent.length-1, 0)
    }
    //add step to the flux
    addStep(i){
      let step = {
      'name':'',
      'instance':{},
      'dinamicForm':''
      }
      this.logicContent[i].steps.push(step)
      this.buildInstance(i,this.logicContent[i].steps.length-1)
    }
    //showPreview stuff
    showPreview(){
      this.logicContent.map((v,i)=>{
        v.steps.map((vv,ii)=>{
          this.logicContent[i].steps[ii].dinamicForm = vv.instance['formData']
        })
      })
      this.displayPreview()
    }
    displayPreview(){
      let elemnts = []
      this.logicContent[this.selected].steps.map((v,i)=>{
         let data = []
         JSON.parse(v.dinamicForm).map((vv,ii)=>{
           data.push(getComponent(vv))
        })
        elemnts.push(this.sanitizer.bypassSecurityTrustHtml(data.join().replace(/,/g , " ")))
      })
      this.formElements = elemnts
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
    /*  let allForms = fbInstances.map((fb)=>{
      return fb.formData
    })  var payload = {
        id: this.dataModel['id'],
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
                templateForm: this.formBuilder.formData
              }
            ]
          }
        ]
      }
      this.http.patch('https://products-mxagrocompara1-dev.appls.cto1.paas.gsnetcloud.corp/product',
          payload, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
          .subscribe(data => {
              console.log(data)
              this.snackBar.open('Producto guardado.', '', { duration: 1500 })
          });*/
    }
  }
