import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menuItems: Menu[];

  constructor(private router: Router, public navServices: NavService) {
    this.navServices.items.subscribe(menuItems => this.menuItems = menuItems);
    this.router.events.subscribe((event) => {
      this.navServices.mainMenuToggle = false;
    });
  }

  ngOnInit(): void {
  }

  mainMenuToggle(): void {
    this.navServices.mainMenuToggle = !this.navServices.mainMenuToggle;
    this.menuItems.map(item => { item.active = false })
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    // item.active = !item.active;
    this.menuItems.map(menu => {
      if (menu.title === item.title) {
        menu.active = !menu.active;
      } else {
        menu.active = false;
      }
    })
    // console.log('💻', 'toggle', item);
    // console.log('💻', 'items', this.menuItems);
  }

}
