import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: User = {} as User;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.route.params.subscribe((params) => {
      this.id = Number(params['id']);
    });
  }

  token = localStorage.getItem('auth');
  id: number = 0;
  ngOnInit(): void {
    if (!this.token) {
      this.router.navigate(['/login']);
    }
    if (this.id > 0) {
      this.getUser(this.id);
    }
  }

  getUser(id: number) {
    this.userService
      .getUser(id)
      .then((user) => {
        this.user = user;
      })
      .catch((err) => console.log(err));
  }

  deleteUser(id: number) {
    this.userService
      .deleteUser(id)
      .then((res) => {
        this.router.navigate(['/home']);
      })
      .catch((err) => console.log(err));
  }
}
