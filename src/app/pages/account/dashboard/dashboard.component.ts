import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { AuthService } from "src/app/core/auth.service";
import { UserService } from "src/app/core/user.service";
import { ProfileModalComponent } from "src/app/shared/components/modal/profile/profile.component";
import { CommonService } from "src/app/shared/services/common.service";
import { CouponService } from "src/app/shared/services/coupon.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @ViewChild("profileModal") profileModal: ProfileModalComponent;

  public openDashboard: boolean = false;

  public selectedMenu: string = 'account_info';

  public loading: boolean = false;
  public userInfo;

  public currentPassword: string = ""
  public newPassword: string = ""
  public confirmPassword: string = ""
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cs: CommonService,
    private couponService: CouponService,
    private router: Router,
    private modalService: NgbModal,
    public formbuilder: FormBuilder
  ) {
    this.fetchDataFromLS();
    this.fetchAllCoupons();
    this.cs.isLoading.subscribe((loading) => {
      this.loading = loading;
    });
  }

  fetchDataFromLS() {
    let info = JSON.parse(localStorage.getItem('userInfo'));
    if (info) {
      const { username, email, phoneNumber, address, country, city, regionState, zipCode, flatPlot, message } = info;
      this.userInfo = info;
      this.profileImage = info.imageUrl || "";
      this.addressForm.setValue({ username, email, phoneNumber, address, country, otherCountry: '', city, regionState, zipCode, flatPlot, message });
    }
  }

  ngOnInit(): void {
    this.addressForm.controls.country.valueChanges.subscribe(val => {
      if (val === 'Other') {
        // this.addressForm.controls.otherCountry.setValidators([Validators.required])
        this.isOtherCountry = true;
      } else {
        // this.addressForm.controls.otherCountry.clearValidators();
        // this.addressForm.controls.otherCountry.updateValueAndValidity()
        // this.addressForm.controls.otherCountry.setValue("");
        this.isOtherCountry = false;
      }
    })
  }

  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }

  signOut() {
    this.authService.logout().subscribe((res) => {
      // if (res) {
      localStorage.clear();
      this.router.navigate(["/home/fashion"]);
      // }
    });
  }

  selectMenu(key) {
    console.log(key);
    this.selectedMenu = key;
  }


  /****************  Subscribe and Unsubscribe function  *****************/
  unsubscribe() {
    this.loading = true;
    this.userService.unsubscribeUser(this.userInfo.email).subscribe(res => {
      if (res) {
        console.log("unsubscribe success", res);
        this.userInfo['isSubscribed'] = false;
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        this.loading = false;
      }
    })
  }

  subscribe() {
    this.loading = true;
    this.userService.subscribeUser(this.userInfo.email).subscribe(res => {
      if (res) {
        console.log("subscribe success", res);
        this.userInfo['isSubscribed'] = true;
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        this.loading = false;
      }
    })
  }
  /****************  Subscribe and Unsubscribe function end *************/

  // Update Password function
  updatePassword() {
    let data = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    }
    this.loading = true;
    this.userService.changePassword(data).subscribe(res => {
      this.loading = false;
      if (res) {
        this.selectedMenu = 'account_info'
      }
    })
  }

  /**********************  profile pic section  *********************/
  public tempProfileImage: string;
  public profileImage: string;
  public submittingPic: boolean = false;
  // cropper 
  openCropper(content) {
    this.open(content);
  }

  getCroppedImage(croppedImg) {
    this.tempProfileImage = croppedImg
  }

  // modal event
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
        },
        (reason) => {
          this.tempProfileImage = "";
          console.log(`Dismissed`);
        }
      );
  }

  saveProfilePic() {
    this.submittingPic = true;
    let splited = this.tempProfileImage.split('base64,');
    let byteImg = splited[1];
    let data = {
      image: byteImg
    }
    this.userService.updateProfilePic(data).subscribe(res => {
      if (res) {
        console.log(res);
        this.cs.isLoading.next(false);
        this.submittingPic = false;
        this.profileImage = this.tempProfileImage;
        this.tempProfileImage = "";
        this.userInfo = { ...this.userInfo, imageUrl: res['profilePicUrl'] }
        this.cs.writeToLS('userInfo', JSON.stringify(this.userInfo))
        this.modalService.dismissAll('close')
      }
    })
  }
  /**********************  profile pic section end  *********************/


  /******************** Address book   ***********************/
  public isOtherCountry: boolean = false;
  addressForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    address: new FormControl(''),
    country: new FormControl(''),
    otherCountry: new FormControl(''),
    city: new FormControl(''),
    regionState: new FormControl(''),
    zipCode: new FormControl(''),
    flatPlot: new FormControl(''),
    message: new FormControl(''),
  });

  submitAddress() {
    console.log('address', this.addressForm.value);
    let data = {
      ...this.addressForm.value
    }
    this.loading = true;
    this.userService.updateProfile(data).subscribe(res => {
      if (res) {
        this.loading = false
        this.cs.isLoading.next(false)
        this.userInfo = { ...this.userInfo, ...data }
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        this.selectMenu('account_info')
      }
    })
  }

  get checkAddress() {
    let found = true;
    const { address, country, city, regionState, zipCode, flatPlot } = this.userInfo;
    if (!address && !country && !city && !regionState && !zipCode && !flatPlot) {
      found = false;
    }
    return found;
  }
  /******************** Address book end   ***********************/


  /************************ Coupons  *****************************/
  coupons = [];
  fetchAllCoupons() {
    this.couponService.getAllCoupons().subscribe(res => {
      if (res && res['body']) {
        console.log("coupons", res)
        this.coupons = res['body'];
      }
    })
  }

  getFormatDate(date) {
    return moment(date).format('MMM-DD-YYYY');
  }

  /************************ Coupons End  *****************************/
}
