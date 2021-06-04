import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {CartService} from '../../services/cart.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input()
  product!: Product;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService,
              public authService: AuthService,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  delete() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.deleteProduct(id)
      .subscribe(product => this.product = product);
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  edit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  addToCart(product: Product) {
    this.cartService.add(product.id);
  }
}
