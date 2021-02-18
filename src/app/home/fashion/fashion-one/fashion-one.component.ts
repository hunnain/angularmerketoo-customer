import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';


@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {

  public products: Product[] = [];
  public editorPicks: Product[] = [];
  public productCollections: any[] = [];

  constructor(public productService: ProductService) {
    this.getEditorPicks();
    this.productService.getProducts.subscribe(response => {
      if (response['body']) {
        this.products = response['body']
      }
      // Get Product Collection
      // this.products.filter((item) => {
      //   item.collection.filter((collection) => {
      //     const index = this.productCollections.indexOf(collection);
      //     if (index === -1) this.productCollections.push(collection);
      //   })
      // })
    });
  }

  public ProductSliderConfig: any = ProductSlider;

  public sliders = [{
    title: '',
    subTitle: '',
    image: 'assets/images/slider/1.jpg'
  }, {
    title: '',
    subTitle: '',
    image: 'assets/images/slider/2.jpg'
  }
    , {
    title: '',
    subTitle: '',
    image: 'assets/images/slider/3.jpg'
  }]

  // Collection banner
  public collections = [{
    image: 'assets/images/collection/fashion/1.jpg',
    save: 'save 50%',
    title: 'men'
  }, {
    image: 'assets/images/collection/fashion/2.jpg',
    save: 'save 50%',
    title: 'women'
  }];

  // Blog
  public blog = [{
    image: 'assets/images/blog/1.jpg',
    date: '25 January 2018',
    title: 'Magazine ',
    by: 'Marketoo'
  }, {
    image: 'assets/images/blog/2.jpg',
    date: '26 January 2018',
    title: 'Magazine ',
    by: 'John Dio'
  }];

  // Logo
  public logo = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];

  // Main Categories Name and links
  public mainCategories = [{
    title: "Accessories",
    image: 'assets/images/product/fashion/10.jpg',
  }, {
    title: "Clothing",
    image: 'assets/images/product/fashion/11.jpg',
  }, {
    title: "Stationery",
    image: 'assets/images/product/fashion/14.jpg',
  }, {
    title: "Daily Necessities",
    image: 'assets/images/product/fashion/16.jpg',
  }, {
    title: "Handbag/ Rucksack",
    image: 'assets/images/product/fashion/17.jpg',
  }, {
    title: "Skin Care",
    image: 'assets/images/product/fashion/18.jpg',
  }, {
    title: "Leisure Experience",
    image: 'assets/images/product/fashion/25.jpg',
  }];

  ngOnInit(): void {
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }

  getEditorPicks() {
    this.productService.getEditorProducts().subscribe(response => {
      if (response['body']) {
        this.editorPicks = response['body']
      }
    });
  }

}
