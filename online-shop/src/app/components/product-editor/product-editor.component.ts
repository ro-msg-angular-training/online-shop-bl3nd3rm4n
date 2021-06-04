import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit {
  id!: string;
  isAddMode!: boolean;
  originalProduct!: Product;
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.getProduct();
    } else {
      this.product = <Product>{};
    }
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id)
      .subscribe(product => {
          this.originalProduct = JSON.parse(JSON.stringify(product));
          this.product = product;
        }
      );
  }

  submit() {
    if (this.isAddMode) {
      this.productService.createProduct(this.product).subscribe((product) => {
        this.router.navigate(['..', product.id], {relativeTo: this.route});
      });
    } else {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.router.navigate(['..'], {relativeTo: this.route});
      });
    }
  }

  cancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
