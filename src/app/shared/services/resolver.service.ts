import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Product } from '../classes/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class Resolver implements Resolve<Product> {

  public product: Product = {};

  constructor(
    private router: Router,
    public productService: ProductService
  ) { }

  // Resolver
  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    await new Promise(resolve => {
      // setTimeout(resolve, 1000)
      this.productService.getProductBySlug(route.params.slug).pipe(map(items => items))
        .subscribe(product => {
          if (!product['body']) { // When product is empty redirect 404
            this.router.navigateByUrl('/pages/404', { skipLocationChange: true });
          } else {
            this.product = product['body'];
            resolve(this.product)
          }
        })
    });
    return this.product;
  }
}
