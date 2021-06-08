import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Product} from '../models/product';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productIdQuantityMap: Map<number, number> = new Map();

  private orderUrl = '/api/orders';

  constructor(private http: HttpClient, private authService: AuthService) {
    if (localStorage.productIdQuantityMap) {
      this.productIdQuantityMap = new Map(JSON.parse(localStorage.productIdQuantityMap));
    }
  }

  getProducts(): Observable<Map<number, number>> {
    return of(this.productIdQuantityMap);
  }

  remove(id: number): Observable<Map<number, number>> {
    this.productIdQuantityMap.delete(id);
    this.saveToLocalStorage();
    return of(this.productIdQuantityMap);
  }

  updateQuantity(id: number, quantity: number): void {
    this.productIdQuantityMap.set(id, quantity);
    this.saveToLocalStorage();
  }

  add(id: number): void {
    this.productIdQuantityMap.set(id, this.productIdQuantityMap.has(id) ? this.productIdQuantityMap.get(id)! + 1 : 1);
    this.saveToLocalStorage();
  }

  emptyCart(): Observable<Map<number, number>> {
    this.productIdQuantityMap = new Map();
    this.saveToLocalStorage();
    return of(this.productIdQuantityMap);
  }

  saveToLocalStorage(): void {
    localStorage.productIdQuantityMap = JSON.stringify(Array.from(this.productIdQuantityMap.entries()));
  }

  checkout(): Observable<Map<number, number>> {
    const url = `${this.orderUrl}`;
    return this.http.post<Product>(url,
      {
        user: this.authService.user.username,
        products: this.productIdQuantityMap
      }).pipe(() => this.emptyCart());
  }
}
