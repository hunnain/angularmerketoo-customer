import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/auth.service";
import { UserService } from "src/app/core/user.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public openDashboard: boolean = false;

  public selectedMenu: string = 'account_info';

  public loading: boolean = false;
  public userInfo;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
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
}