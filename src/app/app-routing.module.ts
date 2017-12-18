import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Auth
import { AuthService } from './services/auth.service';
import {AuthGuard} from './auth.guard'
//pages
import {LoginComponent} from './login/login.component'
import {HomeComponent} from './home/home.component'
import {ProductsComponent} from './products/products.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {AccountsComponent} from './accounts/accounts.component'
import {ContactsComponent} from './contacts/contacts.component'
import {FormsComponent} from './forms/forms.component'

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/:steep',
    component: ProductsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forms',
    component: FormsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthService, AuthGuard]
})
export class AppRoutingModule {
 }
