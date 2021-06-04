import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  productIdQuantityMap!: Map<number, number>;
  productList!: Array<Product>;
  properties: Array<string> = ['name', 'category', 'price'];

  constructor(private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.updateCart(this.cartService.getProducts());
  }

  updateCart(obs: Observable<Map<number, number>>): void {
    this.productList = [];
    obs.subscribe(products => {
      this.productIdQuantityMap = products;
      this.setProductList();
    });
  }

  setProductList() {
    Array.from(this.productIdQuantityMap.keys()).forEach(
      id => this.productService.getProduct(id).subscribe(product => this.productList.push(product))
    );
  }

  checkout() {
    this.updateCart(this.cartService.checkout());
  }

  remove(product: Product) {
    this.updateCart(this.cartService.remove(product.id));
  }

  updateQuantity(product: Product, $event: any) {
    this.cartService.updateQuantity(product.id, $event);
  }
}
