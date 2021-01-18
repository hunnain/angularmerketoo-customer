import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../../../../shared/classes/product';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  @Input() products: Product[] = [];
  @Input() colors: any[] = [];

  @Output() colorsFilter: EventEmitter<any> = new EventEmitter<any>();

  public collapse: boolean = true;

  public lang: string = "en";
  constructor(private translateService: TranslateService) {
    this.lang = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe(res => {
      this.lang = res.lang;
    })
  }

  ngOnInit(): void {
  }

  get filterbycolor() {
    let uniqueColors = []
    uniqueColors = ColorOptions(this.lang).map(item => item.text);
    // this.products.filter((product) => {
    //   product.variants.filter((variant) => {
    //     if (variant.color) {
    //       const index = uniqueColors.indexOf(variant.color)
    //       if (index === -1) uniqueColors.push(variant.color)
    //     }
    //   })
    // })
    return uniqueColors
  }

  appliedFilter(event) {
    let index = this.colors.indexOf(event.target.value);  // checked and unchecked value
    if (event.target.checked)
      this.colors.push(event.target.value); // push in array cheked value
    else
      this.colors.splice(index, 1);  // removed in array unchecked value

    let colors = this.colors.length ? { color: this.colors.join(",") } : { color: null };
    this.colorsFilter.emit(colors);
  }

  // check if the item are selected
  checked(item) {
    if (this.colors.indexOf(item) != -1) {
      return true;
    }
  }

}


export const ColorOptions = (lang) => [
  { id: 'red', text: lang === 'en' ? 'Red' : '紅' },
  { id: 'orange', text: lang === 'en' ? 'Orange' : '橙' },
  { id: 'yellow', text: lang === 'en' ? 'Yellow' : '黃' },
  { id: 'green', text: lang === 'en' ? 'Green' : '綠' },
  { id: 'blue', text: lang === 'en' ? 'Blue' : '藍' },
  { id: 'indigo', text: lang === 'en' ? 'Indigo' : '靛' },
  { id: 'voilet', text: lang === 'en' ? 'Violet' : '紫' },
  { id: 'grey', text: lang === 'en' ? 'Grey' : '灰' },
  { id: 'black', text: lang === 'en' ? 'Black' : '黑' },
  { id: 'white', text: lang === 'en' ? 'White' : '白' },
];

