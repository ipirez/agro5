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
    templateUrl: './productNew.component.html',
    styleUrls: ['/productNew.component.scss']
})
export class ProductsNewComponent implements ProductsInterface {
    @Input() data: any;
    //objeto FormGroup que contiene la informacion del producto y tener validaciones
    productForm: FormGroup;
    private color:string ="#127bdc";

    constructor(public http: HttpClient, private router: Router, private fb: FormBuilder, public snackBar: MatSnackBar) {

    }

    ngOnInit() {

        //creamos el form del producto
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            image: ['', Validators.required, CustomValidators.imageWeight, CustomValidators.imageSize],
            insuranceCarriers: this.fb.array([])
        });
    }

    saveProduct() {
        console.log(this.productForm);
        if (this.productForm.status === 'VALID') {
            let p: Product = new Product(this.productForm.value.name, this.productForm.value.image);
            console.log(this.productForm.value);
            this.productForm.controls["insuranceCarriers"].value.forEach(item => {
                //console.log(item);
                let ic = new InsuranceCarrier(item.name,
                    item.email,
                    item.primaryColor,
                    item.secondaryColor, item.logo);

                p.addInsuranceCarrier(ic);
            });

            this.http.post('https://products-mxagrocompara1-dev.appls.cto1.paas.gsnetcloud.corp/product',
                JSON.stringify(p), { headers: new HttpHeaders().set('Content-Type', 'application/json') })
                .subscribe(data => {
                    this.snackBar.open('Producto guardado.', '', { duration: 1500 })
                    setTimeout(() => {
                        this.router.navigate(['/products/flow/'],{queryParams: { id: data.id }})
                    }, 1500)
                });
        }
        else {
            this.snackBar.open('Por favor llena todos los campos.', '', { duration: 3000 })
            //this.productForm.updateValueAndValidity()
        }
    }

    setImage(c, node, idx) {
        var imgBase64: string;
        let file = c.srcElement.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function() {
            document.getElementById(node).style.backgroundImage = "url('" + reader.result + "')";
            imgBase64 = reader.result.toString();
        };

        //se pone el set time para que asigne correctamente el valor de la imagen
        setTimeout(() => {
            if (node === "product-logo") {
                //se asigna en la propiedad
                this.productForm.patchValue({ image: imgBase64 });
            } else {
                this.insuranceCarriersFormArray.at(idx).patchValue({ logo: imgBase64 });
                console.log(this.productForm.value.insuranceCarriers[idx]);
            }
        }, 500);
    }

    //Asigna los valores correspondientes al asegurador.
    onChangeColor(o: Object, controller: string, id: number) {
        if (controller === "color1") {
            this.insuranceCarriersFormArray.at(id).patchValue({ primaryColor: o.toString() });
            //this.productForm.value.insuranceCarriers[id].primaryColor = o.toString();
        }
        else {
            this.insuranceCarriersFormArray.at(id).patchValue({ secondaryColor: o.toString() });
            //this.productForm.value.insuranceCarriers[id].secondaryColor = o.toString();
        }
    }

    //Obtiene el arreglo de aseguradoras
    get insuranceCarriersFormArray(): FormArray {
        return this.productForm.get('insuranceCarriers') as FormArray;
    }

    //Inicializa
    initInsuranceCarrier() {
        return this.fb.group({
            logo: ['',Validators.required, CustomValidators.imageWeight, CustomValidators.imageSize],
            name: ['', Validators.required],
            email: ['', Validators.email],
            primaryColor: [''],
            secondaryColor: ['']
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
