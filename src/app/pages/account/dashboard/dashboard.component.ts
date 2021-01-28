import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public openDashboard: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }

  signOut() {
    this.authService.logout().subscribe((res) => {
      if (res) {
        localStorage.clear();
        this.router.navigate(["/home/fashion"]);
      }
    });
  }
  selectedMenu = null;
  selectMenu(key) {
    console.log(key);
    this.selectedMenu = key;
  }
}
