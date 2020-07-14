import { Component, OnInit } from '@angular/core';
import { TeamSlider, TestimonialSlider } from '../../shared/data/slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.scss']
})
export class SellerSignUpComponent implements OnInit {
  addBatteryForm: FormGroup;

  constructor(
    public formbuilder: FormBuilder

  ) {
    this.addBatteryForm = this.formbuilder.group({
      'SerialNumber': ['', Validators.compose([Validators.required])],
      'BatteryRuleId': ['', Validators.compose([Validators.required])],
      'BMSSerialNumber': ['', Validators.compose([Validators.required])],
      'SCUSerialNumber': ['', Validators.compose([Validators.required])],
      'TIUSerialNumber': ['', Validators.compose([Validators.required])],
      'ModuleSerialNumber': ['', Validators.compose([Validators.required])],
      'AcceptanceTestResult': [''],
      'Status': [''],
    });
  }

  ngOnInit(): void {
  }

  public TeamSliderConfig: any = TeamSlider;
  public TestimonialSliderConfig: any = TestimonialSlider;

  sendData(result) {
    //TODO update with your own behavior
    console.log(result);
  }

}
