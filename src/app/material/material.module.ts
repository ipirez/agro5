import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatInputModule,
  MatStepperModule,
  MatChipsModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatStepperModule,
    MatChipsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatStepperModule,
    MatChipsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class MaterialModule { }
