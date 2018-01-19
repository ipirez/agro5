import {Component, Input, SimpleChanges} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {FormGroup, FormControl, FormArray, Validators, NgForm, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductsInterface} from './../productsInterface.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
//Custom Validators
//NOTE: ->some validations in are NOT native in in @angular/forms like input file and few others important validate operators se this articule for more explication https://www.toptal.com/angular-js/angular-4-forms-validation
import {CustomValidators} from './../../../app/tools/custom.validators';
import {Product} from "../../models/Product.class";
import {InsuranceCarrier} from "../../models/insuranceCarrier.class";

const URL = "http://localhost:4200/api/upload";

@Component({
  template: `
    <div class="product">
      <form [formGroup]="productForm">
        <mat-horizontal-stepper [linear]="true">
          <mat-step [stepControl]="productForm">

            <div class="header">
              <h1 class="mat-display-3">Nuevo Producto</h1>
              <p class="mat-subheading-2">Nombre e imagen de tu nuevo producto.</p>
            </div>
            <mat-card class="cardFull">
              <div class="inner">
                <div class="imageUploader" id="productImage">
                  <input type="file" id="fuLogo"
                         accept="image/png, image/jpg, image/jpeg"/>
                  <input type="hidden" formControlName="logo" id="newUpload-1-text"/>
                </div>
                <div class="formHolder textInput">
                  <mat-form-field>
                    <input type="text" matInput placeholder="Nombre del producto" id="txtProductName"
                           formControlName="name" required>
                  </mat-form-field>
                  <small *ngIf="!productForm.controls.name.valid" class="text-danger">
                    El nombre es requerido.
                  </small>
                  <!--<small *ngIf="!productForm.controls.logo.valid" class="text-danger">
                    El logo es requerido.
                  </small>-->
                </div>

                <mat-card-actions>
                  <button mat-button routerLink="/products">CANCELAR</button>
                  <button mat-raised-button color="primary" matStepperNext>CONTINUAR</button>
                </mat-card-actions>
              </div>
            </mat-card>

          </mat-step>


          <mat-step>
            <div class="header">
              <h1 class="mat-display-3">Aseguradoras participantes</h1>
              <p class="mat-subheading-2">Nombre e imagen de tu nuevo producto.</p>
            </div>
            <div formArrayName="insuranceCarriers">
              <div id="cards" *ngFor="let ic of insuranceCarriersFormArray.controls; let idx = index">
                <mat-card [formGroupName]="idx" class="cardFull">

                  <div class="inner full">


                    <div class="imageUploader">
                      <input type="file"
                             (change)="setImage($event,this)" accept=".png, .jpg, .jpeg"/>
                      <input type="hidden" formControlName="logo"/>
                    </div>
                    <div class="table">
                      <div class="formRow">
                        <div class="formHolder inputHalf">
                          <mat-form-field>
                            <input type="text" matInput placeholder="Aseguradora"
                                   formControlName="name">
                          </mat-form-field>
                          <small [hidden]="productForm.controls.insuranceCarriers.controls[idx].controls.name.valid">
                            El nombre de aseguradora es requerido.
                          </small>
                        </div>
                        <div class="formHolder inputHalf">
                          <mat-form-field>
                            <input type="text" matInput placeholder="Correo eléctronico"
                                   formControlName="email">
                          </mat-form-field>
                          <small [hidden]="productForm.controls.insuranceCarriers.controls[idx].controls.email.valid">
                            El email de aseguradora es requerido.
                          </small>
                        </div>
                      </div>

                      <div class="formRow">
                        <div class="formHolder input-2Special">
                          <div class="color"
                               [style.background]="productForm.value.insuranceCarriers[idx].primaryColor"></div>
                          <mat-form-field>
                            <input type="text" (colorPickerChange)="onChangeColor($event, 'color1', idx)"
                                   [(colorPicker)]="productForm.value.insuranceCarriers[idx].primaryColor" matInput
                                   placeholder="Color primario"
                                   formControlName="primaryColor"
                                   value="{{ productForm.value.insuranceCarriers[idx].primaryColor }}"
                                   id="color1-{{idx}}">
                          </mat-form-field>
                        </div>
                        <div class="formHolder input-2Special">
                          <div class="color"
                               [style.background]="productForm.value.insuranceCarriers[idx].secondaryColor"></div>
                          <mat-form-field>
                            <input type="text" (colorPickerChange)="onChangeColor($event,'color2', idx)"
                                   [(colorPicker)]="productForm.value.insuranceCarriers[idx].secondaryColor" matInput
                                   placeholder="Color secundario"
                                   id="color2-{{idx}}"
                                   formControlName="secondaryColor"
                                   value="{{ productForm.value.insuranceCarriers[idx].secondaryColor }}">
                          </mat-form-field>
                          <!--<show-errors [control]="secondFormGroup.controls.color2"></show-errors>-->
                        </div>
                      </div>
                    </div>
                  </div>

                  <mat-menu #options="matMenu">
                    <button mat-menu-item>
                      <mat-icon>edit</mat-icon>
                      Editar
                    </button>
                    <button mat-menu-item>
                      <mat-icon>content_copy</mat-icon>
                      Duplicar
                    </button>
                    <button mat-menu-item class="border" (click)="deleteUser(idx)">
                      <mat-icon>delete</mat-icon>
                      Eliminar
                    </button>
                  </mat-menu>

                  <button mat-icon-button [matMenuTriggerFor]="options" class="options">
                    <mat-icon>more_vert</mat-icon>
                  </button>

                </mat-card>
              </div>
            </div>
            <div class="add">
              <p (click)="addUser()">+ AGREGAR ASEGURADORA</p>
            </div>
            <div class="actionButtons">
              <button mat-button matStepperPrevious (click)="deleteAllUsers()">CANCELAR</button>
              <button mat-raised-button color="primary" (click)="saveProduct()">CONTINUAR</button>
            </div>
          </mat-step>
        </mat-horizontal-stepper>

      </form>
    </div>
  `,
  styleUrls: ['/productNew.component.scss']
})
export class ProductsNewComponent implements ProductsInterface {
  @Input() data: any;
  //objeto FormGroup que contiene la informacion dle producto y tener validaciones
  productForm: FormGroup;

  constructor(public http: HttpClient, private router: Router, private fb: FormBuilder, public snackBar: MatSnackBar) {

  }

  ngOnInit() {

    //creamos el form del producto
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      logo: [''],
      insuranceCarriers: this.fb.array([])
    });

    //console.log(this.productForm.controls['insuranceCarriers']);
  }

  saveProduct() {
    console.log(this.productForm.status);
    if (this.productForm.status === 'INVALID') {
      let p: Product = new Product(this.productForm.controls["name"].value, "");

      this.productForm.controls["insuranceCarriers"].value.forEach(item => {
        let ic = new InsuranceCarrier(item.name,
          item.email,
          item.primaryColor,
          item.secondaryColor, "");

        p.addInsuranceCarrier(ic);
      });

      this.http.post('https://products-mxagrocompara1-dev.appls.cto1.paas.gsnetcloud.corp/product',
        JSON.stringify(p), {headers: new HttpHeaders().set('Content-Type', 'application/json')})
        .subscribe(err => {
          console.log("Ocurrio un error" + err);
        });

      setTimeout(() => {
        this.router.navigate(['/products/flow'])
      }, 1000)
    }
    else {
      this.snackBar.open('Por favor llena todos los campos.', '', {duration: 3000})
      this.productForm.updateValueAndValidity()
    }
    /*
    this.addProduct().subscribe(
      data => {
        this.snackBar.open('LISTO!', '', {duration: 3000})
        setTimeout(() => {
          this.router.navigate(['/products/flow'])
        }, 1000)
      },
      err => {
        this.snackBar.open(err.message, '', {duration: 3000})
      },
      () => console.log('done')
    );*/
  }

  addProduct() {
    //console.log(this.insuranceCarriers);
    if (this.productForm.status === 'VALID') {
      let p: Product = new Product(this.productForm.controls["name"].value, "");

      this.productForm.controls["insuranceCarriers"].value.forEach(item => {
        let ic = new InsuranceCarrier(item.name,
          item.email,
          item.primaryColor,
          item.secondaryColor, "");

        p.addInsuranceCarrier(ic);
      });

      console.log(p);
      //aqui va el post
      return this.http.post('https://products-mxagrocompara1-dev.appls.cto1.paas.gsnetcloud.corp:443/product',
        JSON.stringify(p), {headers: new HttpHeaders().set('Content-Type', 'application/json')})
    }
    else {
      this.snackBar.open('Por favor llena todos los campos.', '', {duration: 3000})
      this.productForm.updateValueAndValidity()
    }
  }


  setImage(c, node) {
    /*
        let file = c.srcElement.files[0]
        var _URL = window.URL;
        let img = new Image();
        img.onload = function () {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            let parent = document.getElementById(c.srcElement.id).parentElement.id //tslint:disable-line
            let controlName = document.getElementById(c.srcElement.id + '-text').getAttribute('formcontrolname')
            let controledBy = document.getElementById(c.srcElement.id).getAttribute('controledBy')
            document.getElementById(parent).style.backgroundImage = "url('" + reader.result + "')"
            node[controledBy].controls[controlName].setValue(reader.result, {onlySelf: true})
            node[controledBy].controls[controlName].markAsTouched();
            node[controledBy].updateValueAndValidity()
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
        }
        img.src = _URL.createObjectURL(file);*/
  }


  onChangeColor(o: Object, controller: string, id: number) {
    if (controller === "color1") {
      this.productForm.value.insuranceCarriers[id].primaryColor = o.toString();
    }
    else {
      this.productForm.value.insuranceCarriers[id].secondaryColor = o.toString();
    }
  }

  //Obtiene el arreglo de aseguradoras
  get insuranceCarriersFormArray(): FormArray {
    return this.productForm.get('insuranceCarriers') as FormArray;
  }

  //Inicializa
  initInsuranceCarrier() {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      logo: [''],
      primaryColor: ['', Validators.required],
      secondaryColor: ['', Validators.required]
    });
  }

  //Agrega un formGroup de tipo Aseguradora al array
  addUser() {
    let icf = this.initInsuranceCarrier();
    this.insuranceCarriersFormArray.push(icf);
  }

  //Elimina todos los FormGroup del arreglo
  deleteAllUsers() {
    for (let i = 0; i <= this.insuranceCarriersFormArray.length; i++) {
      this.deleteUser(i);
    }
  }

  //Elimina una aseguradora en el indice indicado
  deleteUser(idx: number) {
    this.insuranceCarriersFormArray.removeAt(idx);
    //console.log(idx);
  }

}
