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
  MatSlideToggleModule
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
    MatSlideToggleModule
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
    MatSlideToggleModule
  ],
  declarations: []
})
export class MaterialModule { }
