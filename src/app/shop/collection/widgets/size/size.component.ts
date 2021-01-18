import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../../../../shared/classes/product';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {

  @Input() products: Product[] = [];
  @Input() size: any[] = [];

  @Output() sizeFilter: EventEmitter<any> = new EventEmitter<any>();

  public collapse: boolean = true;

  public lang: string = 'en';
  constructor(private translateService: TranslateService) {
    this.lang = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe(res => {
      this.lang = res.lang;
    })
  }

  ngOnInit(): void {
  }

  get filterbysize() {
    let uniqueSize = []
    uniqueSize = SizeOptions(this.lang).map(item => item.text);
    // this.products.filter((product) => {
    //   product.variants.filter((variant) => {
    //     if (variant.size) {
    //       const index = uniqueSize.indexOf(variant.size)
    //       if (index === -1) uniqueSize.push(variant.size)
    //     }
    //   })
    // })
    return uniqueSize
  }

  appliedFilter(event) {
    let index = this.size.indexOf(event.target.value);  // checked and unchecked value
    if (event.target.checked)
      this.size.push(event.target.value); // push in array cheked value
    else
      this.size.splice(index, 1);  // removed in array unchecked value  

    let size = this.size.length ? { size: this.size.join(",") } : { size: null };
    this.sizeFilter.emit(size);
  }

  // check if the item are selected
  checked(item) {
    if (this.size.indexOf(item) != -1) {
      return true;
    }
  }

}

export const SizeOptions = (lang) => [
  { id: 'xs', text: lang === 'en' ? 'XS' : '加細碼' },
  { id: 's', text: lang === 'en' ? 'S' : '細號' },
  { id: 'm', text: lang === 'en' ? 'M' : '中碼' },
  { id: 'l', text: lang === 'en' ? 'L' : '大碼' },
  { id: 'xl', text: lang === 'en' ? 'XL' : '加大碼' },
  { id: 'xxl', text: lang === 'en' ? 'XXL' : '加大大碼' },
];
