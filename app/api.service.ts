import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response } from '@angular/http';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: Http
  ) { }

  // API: GET /products
  public getAllProducts(): Observable<Product[]> {
    return this.http
      // .get(API_URL + '/products')
      .get('/api/v1/products')
      .map(response => {
        const products = response.json().data;
        console.log(response.json().data);
        return products.map((product) => new Product(product));
      })
      .catch(this.handleError);
  }

  // API: POST /products
  public createProduct(product: Product): Observable<Product> {
    return this.http
    // .post(API_URL + '/products', product)
    .post('/api/v1/products', product)
    .map(response => {
      product.id = response.json().data;
      return new Product(product);
    })
    .catch(this.handleError);
  }

  // API: GET /products/:id
  public getProductById(productId: number): Observable<Product> {
    return this.http
    // .get(API_URL + '/products/' + productId)
    .get('/api/v1/products/' + productId)
    .map(response => {
      return new Product(response.json());
    })
    .catch(this.handleError);
  }

  // API: PUT /products/:id
  public updateProduct(id: number, product: Product): Observable<Product> {
    return this.http
    // .put(API_URL + '/products/' + product.id, todo)
    .put('/api/v1/products/' + id, product)
    .map(response => {
      return new Product(product);
    })
    .catch(this.handleError);
  }

  // DELETE /products/:id
  public deleteProductById(productId: number): Observable<null>  {
    return this.http
    // .delete(API_URL + '/products/' + todoId)
    .delete('/api/v1/products/' + productId)
    .map(response => null)
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
