import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/core/auth.service";
import { UserService } from "src/app/core/user.service";
import { ProfileModalComponent } from "src/app/shared/components/modal/profile/profile.component";
import { CommonService } from "src/app/shared/services/common.service";

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
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.fetchDataFromLS();
  }

  fetchDataFromLS() {
    let info = JSON.parse(localStorage.getItem('userInfo'));
    if (info) {
      this.userInfo = info;
      this.profileImage = info.imageUrl || "";
    }
  }

  ngOnInit(): void { }

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

  // profile pic section
  public tempProfileImage: string;
  public profileImage: string;
  public submittingPic: boolean = false;
  // cropper 
  openCropper(content) {
    this.open(content);
  }

  getCroppedImage(croppedImg) {
    // console.log("crop image", croppedImg)
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
  // profile pic end
}
