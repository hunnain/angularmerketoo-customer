import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/auth.service";
import { UserService } from "src/app/core/user.service";
import { ProfileModalComponent } from "src/app/shared/components/modal/profile/profile.component";

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
    private router: Router
  ) {
    this.fetchDataFromLS();
  }

  fetchDataFromLS() {
    let info = JSON.parse(localStorage.getItem('userInfo'));
    if (info) {
      this.userInfo = info;
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
}
