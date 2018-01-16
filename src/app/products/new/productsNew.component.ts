import { Component, Input  }  from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {FormGroup, FormControl, FormArray, Validators, NgForm, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import { ProductsInterface } from './../productsInterface.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//Custom Validators
//NOTE: ->some validations in are NOT native in in @angular/forms like input file and few others important validate operators se this articule for more explication https://www.toptal.com/angular-js/angular-4-forms-validation
import { CustomValidators } from 'app/tools/custom.validators';
@Component({
  template:`
  <div class="product">
    <mat-horizontal-stepper [linear]="true">
      <mat-step [stepControl]="firstFormGroup">
        <form [formGroup]="firstFormGroup" novalidate>
          <div class="header">
              <h1 class="mat-display-3">Nuevo Producto</h1>
              <p class="mat-subheading-2">Nombre e imagen de tu nuevo producto.</p>
          </div>
          <div class="holderStuff">
          <mat-card class="cardFull">
            <div class="inner">
              <div class="imageUploader" id="productImage">
                <input type="file" id="newUpload-1" controledBy="firstFormGroup" (change)="setImage($event,this)" accept=".png, .jpg, .jpeg" />
                <input type="hidden" formControlName="upload" id="newUpload-1-text"/>
              </div>
              <div class="formHolder textInput">
                <mat-form-field >
                  <input type="text" matInput placeholder="Nombre del producto" id="newProductName-1" formControlName="name" required>
                </mat-form-field>
                <show-errors [control]="firstFormGroup.controls.upload"></show-errors>
                <show-errors [control]="firstFormGroup.controls.name"></show-errors>
              </div>
              <mat-card-actions>
                <button mat-button routerLink="/products">Cancelar</button>
                <button mat-raised-button color="primary" matStepperNext>Continuar</button>
              </mat-card-actions>
            </div>
          </mat-card>
        </form>
      </mat-step>
      <mat-step [stepControl]="secondFormGroup">
        <div class="header">
          <h1 class="mat-display-3">Aseguradoras participantes</h1>
          <p class="mat-subheading-2">Nombre e imagen de tu nuevo producto.</p>
        </div>
        <mat-card class="cardFull">
          <form [formGroup]="secondFormGroup" novalidate>
            <div class="inner full">
              <div class="imageUploader" id="userImage">
                <input type="file" id="newUploadUser-1" controledBy="secondFormGroup" (change)="setImage($event,this)" accept=".png, .jpg, .jpeg" />
                <input type="hidden" formControlName="upload" id="newUploadUser-1-text"/>
              </div>
              <div class="table">
                <div class="formRow">
                  <div class="formHolder inputHalf">
                    <mat-form-field>
                      <input type="text" matInput placeholder="Aseguradora" id="newUserName-1" formControlName="name">
                    </mat-form-field>
                    <show-errors [control]="secondFormGroup.controls.name"></show-errors>
                  </div>
                  <div class="formHolder inputHalf">
                    <mat-form-field>
                      <input type="text" matInput placeholder="Correo eléctronico" id="newUserEmail-1" formControlName="email">
                    </mat-form-field>
                    <show-errors [control]="secondFormGroup.controls.email"></show-errors>
                  </div>
                </div>
                <div class="formRow">
                  <div class="formHolder input-2Special">
                    <div class="color" [style.background]="color"></div>
                      <mat-form-field>
                        <input type="text" (colorPickerChange)="onChangeColor($event,'color1')" [(colorPicker)]="color" matInput placeholder="Color primario" id="newUserPrimaryColor-1" value="{{color}}" formControlName="color1">
                      </mat-form-field>
                      <show-errors [control]="secondFormGroup.controls.color1"></show-errors>
                    </div>
                    <div class="formHolder input-2Special">
                    <div class="color" [style.background]="color2"></div>
                      <mat-form-field>
                        <input type="text" (colorPickerChange)="onChangeColor($event,'color2')" [(colorPicker)]="color2"  matInput placeholder="Color secundario" id="newUserSecondaryColor-1" value="{{color2}}" formControlName="color2">
                      </mat-form-field>
                      <show-errors [control]="secondFormGroup.controls.color2"></show-errors>
                    </div>
                    <show-errors [control]="secondFormGroup.controls.upload"></show-errors>
                    </div>
                  </div>
                </div>
                <mat-menu #options="matMenu">
                  <button mat-menu-item> <mat-icon >edit</mat-icon> Editar </button>
                  <button mat-menu-item> <mat-icon >content_copy</mat-icon> Duplicar </button>
                  <button mat-menu-item class="border"> <mat-icon >delete</mat-icon> Eliminar </button>
                </mat-menu>

                <button mat-icon-button [matMenuTriggerFor]="options" class="options">
                  <mat-icon >more_vert</mat-icon>
                </button>
              </form>
            </mat-card>
          </div>
          <div class="add">
            <p (click)="addUser()">+ Agregar aseguradora</p>
          </div>
          <div class="actionButtons">
            <button mat-button matStepperPrevious>Cancelar</button>
            <button mat-raised-button color="primary" (click)="saveProduct()">Continuar</button>
          </div>
        </mat-step>
    </mat-horizontal-stepper>
  </div>
  `,
  styleUrls: ['/productNew.component.scss']
})
export class ProductsNewComponent implements ProductsInterface {
  @Input() data: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(public http: HttpClient, private router: Router, private _formBuilder: FormBuilder, public snackBar: MatSnackBar){

  }

  saveProduct(){
    this.addProduct().subscribe(
      data => {
        this.snackBar.open('LISTO!','',{duration: 3000})
        setTimeout(()=>{
          this.router.navigate(['/products/flow'])
        },1000)
      },
        err =>{
          this.snackBar.open(err.message,'',{duration: 3000})
        },
        () => console.log('done')
      );
  }
  addProduct(){
    if(this.secondFormGroup.status === 'VALID'){
      var payload = {
        name: this.firstFormGroup.value.name,
        image: this.firstFormGroup.value.upload,
        insuranceCarriers: [
          {
            email: this.secondFormGroup.value.email,
            logo: this.secondFormGroup.value.upload,
            name: this.secondFormGroup.value.name,
            primaryColor: this.secondFormGroup.value.color1,
            secondaryColor: this.secondFormGroup.value.color2
          }
        ],
        "stages": []
      }
      //aqui va el post
       let headers = new HttpHeaders().set('Content-Type','application/json')
       return this.http.post('https://products-mxagrocompara1-dev.appls.cto1.paas.gsnetcloud.corp:443/product', JSON.stringify(payload), {headers: headers})
    }
    else{
      this.secondFormGroup.updateValueAndValidity()
    }
  }
  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      name: new FormControl('', Validators.required, CustomValidators.uniqueName),
      upload: new FormControl('', CustomValidators.image)
    });
    this.secondFormGroup = new FormGroup({
      upload: new FormControl('', CustomValidators.image),
      name: new FormControl('', Validators.required, CustomValidators.uniqueName),
      email: new FormControl('',Validators.required),
      color1: new FormControl('',Validators.required),
      color2: new FormControl('',Validators.required)
    });
  }
  setImage(c, node){
  let file = c.srcElement.files[0]
  var _URL = window.URL;
  let img = new Image();
  img.onload = function () {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        let parent = document.getElementById(c.srcElement.id).parentElement.id //tslint:disable-line
        let controlName = document.getElementById(c.srcElement.id+'-text').getAttribute('formcontrolname')
        let controledBy = document.getElementById(c.srcElement.id).getAttribute('controledBy')
        document.getElementById(parent).style.backgroundImage = "url('"+reader.result+"')"
        node[controledBy].controls[controlName].setValue(reader.result, {onlySelf: true})
        node[controledBy].controls[controlName].markAsTouched();
        node[controledBy].updateValueAndValidity()
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
  }
  img.src = _URL.createObjectURL(file);
}
  onChangeColor(o: Object, controller: string){
  this.secondFormGroup.controls[controller].setValue(o, {onlySelf: true})
  this.secondFormGroup.controls[controller].markAsTouched();
  this.secondFormGroup.updateValueAndValidity()
}
  addUser(){
    alert('agrega usuario')
  }
 }
