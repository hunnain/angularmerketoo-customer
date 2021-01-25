import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LabelOptions } from '../../../../shared/utilities';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  @Input() label: any[] = [];

  @Output() labelFilter: EventEmitter<any> = new EventEmitter<any>();

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

  get filterbylabel() {
    let uniqueLabel = []
    uniqueLabel = LabelOptions(this.lang).map(item => item.text);
    // this.products.filter((product) => {
    //   product.variants.filter((variant) => {
    //     if (variant.label) {
    //       const index = uniqueLabel.indexOf(variant.label)
    //       if (index === -1) uniqueLabel.push(variant.label)
    //     }
    //   })
    // })
    return uniqueLabel;
  }

  appliedFilter(event) {
    let index = this.label.indexOf(event.target.value);  // checked and unchecked value
    if (event.target.checked)
      this.label.push(event.target.value); // push in array cheked value
    else
      this.label.splice(index, 1);  // removed in array unchecked value  

    let label = this.label.length ? { label: this.label.join(",") } : { label: null };
    this.labelFilter.emit(label);
  }

  // check if the item are selected
  checked(item) {
    if (this.label.indexOf(item) != -1) {
      return true;
    }
  }

}