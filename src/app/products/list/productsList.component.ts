import {Component, Input, OnInit} from '@angular/core';
import {ProductsInterface} from './../productsInterface.component';
import {Product} from '../../models/products.class';
import {InsuranceCarrier} from '../../models/insuranceCarrier.class';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  template: `
    <div class="product">
      <div class="header">
        <div class="row">
          <p class="mat-title">Hola, {{userName}} </p>
          <button mat-icon-button class="help">
            <mat-icon>help</mat-icon>
          </button>
        </div>
        <div class="row">
          <button mat-raised-button color="primary" routerLink="/products/new">NUEVO PRODUCTO</button>
        </div>
      </div>


      <mat-card *ngFor="let p of this.products" class="cardFull">
        <mat-card-header>
          <mat-card-title>{{ p.name }}</mat-card-title>
          <div mat-card-avatar class="image"></div>
          <mat-card-subtitle>{{ p.getInsuranceNames() }}</mat-card-subtitle>
          <mat-menu #options="matMenu">
            <button mat-menu-item>
              <mat-icon>edit</mat-icon>
              Editar
            </button>
            <button mat-menu-item>
              <mat-icon>content_copy</mat-icon>
              Duplicar
            </button>
            <button mat-menu-item class="border">
              <mat-icon>delete</mat-icon>
              Eliminar
            </button>
          </mat-menu>

          <button mat-icon-button [matMenuTriggerFor]="options" class="options">
            <mat-icon>more_vert</mat-icon>
          </button>
        </mat-card-header>
      </mat-card>

    </div>
  `,
  styleUrls: ['./../products.component.scss']
})
export class ProductsListComponent implements ProductsInterface, OnInit {

  @Input() data: any;
  public userName: string;
  public products: Product[];

  constructor(public http: HttpClient) {
    this.products = [];
  }

  ngOnInit() {
    this.userName = "ADMIN";

    let data = [
      {
        "id": "ID1",
        "image": "NONE",
        "insuranceCarriers": [
          {
            "email": "ipirez@palo-it.com",
            "logo": "string",
            "name": "AXA",
            "primaryColor": "BLUE",
            "secondaryColor": "WHITE"
          },
          {
            "email": "malvarez@palo-it.com",
            "logo": "string",
            "name": "QUALITAS",
            "primaryColor": "BLUE",
            "secondaryColor": "WHITE"
          }
        ],
        "name": "BICI COMPARA",
        "stages": []
      },
      {
        "id": "ID2",
        "image": "NONE",
        "insuranceCarriers": [
          {
            "email": "ipirez@palo-it.com",
            "logo": "string",
            "name": "GNP",
            "primaryColor": "BLUE",
            "secondaryColor": "WHITE"
          },
          {
            "email": "malvarez@palo-it.com",
            "logo": "string",
            "name": "AXA",
            "primaryColor": "BLUE",
            "secondaryColor": "WHITE"
          }
        ],
        "name": "MOTO COMPARA",
        "stages": []
      }];


  data.forEach(d => {
      let i: InsuranceCarrier[] = [];

      d.insuranceCarriers.forEach(item => {
        i.push(new InsuranceCarrier(item.name, item.email, item.primaryColor, item.secondaryColor));
      });

      let p: Product = new Product(d.id, d.name, i);
      this.products.push(p);

    });






/*

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get<Product>('https://products-mxagrocompara1-dev.appls.cto1.paas.gsnetcloud.corp:443/products',
      {headers: headers})
      .subscribe(data => {
        console.log(data);
        //let p: Product = new Product(data[0].id, data[0].name, data[0].insuranceCarriers);
        //this.products.push(p);

      }, (err: HttpErrorResponse) => {
        console.log(err.error.message);
      });*/
  }

}
