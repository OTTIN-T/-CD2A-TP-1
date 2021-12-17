import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  token = localStorage.getItem('auth');
  id: number = 0;
  admin = false;
  estateAgent = false;
  constructor() {}

  ngOnInit(): void {
    if (this.token) {
      const decoded = jwtDecode<any>(this.token);
      if (decoded) {
        this.id = decoded.id;
        this.admin = decoded.admin;
        this.estateAgent = decoded.estateAgent;
      }
    }
  }
}
