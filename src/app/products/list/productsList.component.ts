import {Component, Input, OnInit} from '@angular/core';
import {ProductsInterface} from './../productsInterface.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../../models/Product.class';
import {ProductsService} from './../../services/products.service';


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


      <div infiniteScroll
           [infiniteScrollDistance]="2"
           [infiniteScrollThrottle]="300"
           (scrolled)="onScroll()"
           (scrolledUp)="onScrollUp()">
        <mat-card *ngFor="let p of products" class="cardFull">


          <mat-card-header>
            <img mat-card-avatar src="{{ p.image }}" class="image"/>
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
    </div>
  `,
  styleUrls: ['./../products.component.scss']
})
export class ProductsListComponent implements ProductsInterface, OnInit {
  @Input() data: any;
  public userName: string;
  public products: Product[] = [];

  constructor(public http: HttpClient, private service: ProductsService) {

  }

  ngOnInit() {
    this.userName = "ADMIN";
    //Se obtienen todos los productos
    this.products = this.service.getProducts();
  }

  onScroll() {
    console.log("onscroll");
  }

  onScrollUp() {
    console.log("onscrollup");
  }
}
