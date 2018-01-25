//Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
//Routing
import { AppRoutingModule } from './app-routing.module';
//HttpClient
import {HttpClientModule} from '@angular/common/http';
//extra modules
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
//form errors & validations
import { ShowErrorsComponent } from './tools/errors.validators';
//Pages
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { FormsComponent } from './forms/forms.component';
import { ContactsComponent } from './contacts/contacts.component';
  //products Pages
import { ProductsComponent } from './products/products.component';
import {ProductsNewComponent} from './products/new/productsNew.component'
import {ProductsDirective} from './products/products.directive'
import {ProductsListComponent} from './products/list/productsList.component'
import {ProductsNewFlowComponent} from './productFlow/productFlow.component'

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {ColorPickerModule} from 'narik-angular-color-picker';
import {ProductsService} from "./services/products.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    MenuComponent,
    ProductsComponent,
    DashboardComponent,
    AccountsComponent,
    FormsComponent,
    ContactsComponent,
    ProductsNewComponent,
    ProductsDirective,
    ProductsListComponent,
    ProductsNewFlowComponent,
    ShowErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    ColorPickerModule

  ],
  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ProductsNewComponent,ProductsListComponent],
})
export class AppModule { }
