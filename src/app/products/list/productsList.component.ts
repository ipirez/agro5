import {Component, Input, OnInit} from '@angular/core';
import {ProductsInterface} from './../productsInterface.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from './../../models/Product.class';
import {InsuranceCarrier} from "../../models/insuranceCarrier.class";

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
      <mat-card *ngFor="let p of products" class="cardFull">
        <mat-card-header>
          <img mat-card-avatar src="{{ p.image }}" class="image" />
          <mat-card-title>{{ p.name }}</mat-card-title>

          <mat-card-subtitle>{{ p.getInsuranceCarrierNames() }}</mat-card-subtitle>
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
  public products: Product[] = [];

  constructor(public http: HttpClient) {

  }

  ngOnInit() {
    this.userName = "ADMIN"
    this.getProducts()
  }

  //Obtiene todos los productos para listar
  getProducts() {
    //let products: Product = new Product();

    this.http.get<Product[]>('https://products-mxagrocompara1-dev.appls.cto1.paas.gsnetcloud.corp/products',
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe(data => {

        data.forEach(item => {
          let p: Product = new Product(item.name, item.image);
          p.insuranceCarriers = item.insuranceCarriers;
          this.products.push(p);
        });


      }, err => {
        console.log("Ocurrio un error");
      });
  }
}
