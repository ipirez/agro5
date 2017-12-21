import { Component, Input }  from '@angular/core';
import { ProductsInterface } from './../productsInterface.component';

@Component({
  template: `
  <div class="product">
    <div class="header">
      <div class="row">
        <p>Hola, {{userName}} </p>
        <button mat-icon-button class="help">
          <mat-icon>help</mat-icon>
        </button>
      </div>
      <div class="row">
        <button mat-raised-button color="primary" routerLink="/products/new">NUEVO PRODUCTO</button>
      </div>
    </div>
  <mat-card class="cardFull">
    <mat-card-header>
      <mat-card-title>Agrocompara</mat-card-title>
      <div mat-card-avatar class="image"></div>
      <mat-card-subtitle>Axa-Cardif-Mapfre-Quálitas</mat-card-subtitle>
        <mat-menu #options="matMenu">
          <button mat-menu-item> <mat-icon >edit</mat-icon> Editar </button>
          <button mat-menu-item> <mat-icon >content_copy</mat-icon> Duplicar </button>
          <button mat-menu-item class="border"> <mat-icon >delete</mat-icon> Eliminar </button>
        </mat-menu>

        <button mat-icon-button [matMenuTriggerFor]="options" class="options">
        <mat-icon >more_vert</mat-icon>
        </button>
    </mat-card-header>
  </mat-card>
  </div>
  `,
  styleUrls: ['./../products.component.scss']
})
export class ProductsListComponent implements ProductsInterface {
  @Input() data: any;
}
