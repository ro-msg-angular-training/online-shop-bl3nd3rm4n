import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Array<Product>;
  properties: Array<string> = ['name', 'category', 'price'];

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              public authService: AuthService,
              private router: Router,) {
  }


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  createNewProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}


