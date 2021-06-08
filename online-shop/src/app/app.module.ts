import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {ProductEditorComponent} from './components/product-editor/product-editor.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LoginFormComponent,
    ShoppingCartComponent,
    ProductDetailsComponent,
    NavBarComponent,
    ProductEditorComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
}
