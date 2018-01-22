//Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
//Routing
import { AppRoutingModule } from './app-routing.module';
//HttpClient
import {HttpClientModule} from '@angular/common/http';
//extra modules
import { ColorPickerModule } from 'ngx-color-picker';
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
import {ProductsNewFlowComponent} from './products/flow/productFlow.component'

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
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
    ColorPickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProductsNewComponent,ProductsListComponent,ProductsNewFlowComponent],
})
export class AppModule { }
