import {Product} from '../models/Product.class';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";

const GATEWAY_URL: string = "https://products-mxagrocompara1-dev.appls.cto1.paas.gsnetcloud.corp/";
const GET_ENDPOINT: string = "/products";
const POST_ENDPOINT: string = "/product";

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  //Obtiene todos los productos
  getProducts() {
    console.log(GATEWAY_URL + GET_ENDPOINT);
    let products: Product[] = [];

    this.http.get<Product[]>(GATEWAY_URL + GET_ENDPOINT,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe(data => {

        data.forEach(item => {
          let p: Product = new Product(item.name, item.image);
          p.insuranceCarriers = item.insuranceCarriers;
          products.push(p);
        });
      }, err => {
        console.log("Ocurrio un error al obtener los productos");
      });
    return products;
  }

  //Guarda un producto mediante post
  saveProduct(p: Product) {
    this.http.post(GATEWAY_URL + POST_ENDPOINT,
      JSON.stringify(p), {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe(res => {
        console.log("Response" + res);
      }, err => {
        console.log("Ocurrio un error" + err);
      });
  }
}
