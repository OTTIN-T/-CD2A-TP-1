import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  token = localStorage.getItem('auth');

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.token) {
      this.router.navigate(['/login']);
    }
  }
}
