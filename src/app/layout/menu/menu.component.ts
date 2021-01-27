import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  toggleMenu: boolean;

  constructor(private router: Router) {
    this.toggleMenu = false;
  }

  ngOnInit(): void {}

  async navigate(route: string): Promise<any> {
    return this.router.navigate([route]);
  }
}
