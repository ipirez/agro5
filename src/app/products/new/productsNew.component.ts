import { Component, Input }  from '@angular/core';
import { ProductsInterface } from './../productsInterface.component';

@Component({
  template:`
  <div class="product">
    <mat-horizontal-stepper [linear]="isLinear">
      <mat-step [stepControl]="firstFormGroup">
        <div class="header">
            <h1 class="mat-display-3">Nuevo Producto</h1>
            <p class="mat-subheading-2">Nombre e imagen de tu nuevo producto.</p>
        </div>
          <mat-card class="cardFull">
            <div class="inner">
              <div class="imageUploader">
                <input type="file" id="newUpload-1"/>
              </div>
              <mat-form-field class="textInput" >
                <input type="text" matInput placeholder="Nombre del producto" id="newProductName-1">
              </mat-form-field>
              <mat-card-actions>
                <button mat-button routerLink="/products">Cancelar</button>
                <button mat-raised-button color="primary" matStepperNext>Continuar</button>
              </mat-card-actions>
            </div>
          </mat-card>
      </mat-step>
      <mat-step [stepControl]="secondFormGroup">
        <div class="header">
          <h1 class="mat-display-3">Aseguradoras participantes</h1>
          <p class="mat-subheading-2">Nombre e imagen de tu nuevo producto.</p>
        </div>
        <mat-card class="cardFull">
          <div class="inner full">
            <div class="imageUploader">
              <input type="file"id="newUploadUser-1"/>
            </div>
            <div class="table">
              <div class="formRow">
                <mat-form-field class="inputHalf">
                  <input type="text" matInput placeholder="Aseguradora" id="newUserName-1">
                </mat-form-field>
                <mat-form-field class="inputHalf">
                <input type="text" matInput placeholder="Correo eléctronico" id="newUserEmail-1">
                </mat-form-field>
              </div>
              <div class="formRow">
                <div class="color" [style.background]="color"></div>
                <mat-form-field class="input-2Special">
                <input type="text" [(colorPicker)]="color" matInput placeholder="Color primario" id="newUserPrimaryColor-1">
                </mat-form-field>
                <div class="color" [style.background]="color2"></div>
                <mat-form-field class="input-2Special">
                  <input type="text"  [(colorPicker)]="color2"  matInput placeholder="Color secundario" id="newUserSecondaryColor-1">
                </mat-form-field>
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
        </mat-card>
        <div class="add">
          <p>+ Agregar aseguradora</p>
        </div>
        <div class="actionButtons">
          <button mat-button matStepperPrevious>Cancelar</button>
          <button mat-raised-button color="primary" routerLink="/products/flow">Continuar</button>
        </div>
      </mat-step>
    </mat-horizontal-stepper>
  </div>
  `,
  styleUrls: ['/productNew.component.scss']
})
export class ProductsNewComponent implements ProductsInterface {
  @Input() data: any;
}
