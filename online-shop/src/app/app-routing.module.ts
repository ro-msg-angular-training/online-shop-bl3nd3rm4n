import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {ProductEditorComponent} from './components/product-editor/product-editor.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './models/role';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ROLE_USER, Role.ROLE_CUSTOMER, Role.ROLE_ADMIN]
    }
  },
  {
    path: 'products/new',
    component: ProductEditorComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ROLE_ADMIN]
    }
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ROLE_USER, Role.ROLE_CUSTOMER, Role.ROLE_ADMIN]
    }
  },
  {
    path: 'products/:id/edit',
    component: ProductEditorComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ROLE_ADMIN]
    }
  },

  {
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ROLE_CUSTOMER]
    }
  },
  {
    path: '**',
    redirectTo: 'products'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
