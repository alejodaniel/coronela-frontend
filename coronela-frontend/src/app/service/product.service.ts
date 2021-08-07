import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Products} from "../Model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.url + 'server/';

  constructor(private http: HttpClient) {


  }

  getProducts() {
    return this.http.get(this.url + 'product');
  }
  getProductById(id) {
    return this.http.get(this.url + `getProduct/${id}`);
  }

  addProduct(product: Products) {
    return this.http.post(this.url + 'addProd', product);
  }

  updateProduct(product: Products) {
    return this.http.post(this.url + 'updateProd', product)
  }

  deleteProduct(idProducts) {
    return this.http.get(this.url + `deleteProd/${idProducts}`)
  }
}
