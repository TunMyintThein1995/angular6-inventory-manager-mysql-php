import { Injectable } from '@angular/core';
import { Product } from './product';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  products: Product[] = [];

  constructor(
    private api: ApiService
  ) { }
  // GET /products
  getAllProducts(): Observable<Product[]> {
    return this.api.getAllProducts();
  }

  // POST /products
  addProduct(product: Product): Observable<Product> {
    return this.api.createProduct(product);
  }

  // DELETE /products/:id
  removeItem(id: number): Observable<Product> {
    return this.api.deleteProductById(id);
  }

  // PUT /products/:id
  updateProduct(id: number, product: Product): Observable<Product> {
    this.products = this.products.map(i => {
      if (i.id === id) {
        return Object.assign({}, i, product);
      }
      return i;
    });
    return this.api.updateProduct(id, product);
  }

  // Toggle todo complete
  toggleProductStatus(product: Product) {
    if (product.status === 'Active') {
      product.status = 'Inactive';
     } else { product.status  = 'Active'; }
    return this.api.updateProduct(product.id, product );
  }

  // GET /products/:id
  getProductById(id: number): Observable<Product> {
    return this.api.getProductById(id);
  }
}
