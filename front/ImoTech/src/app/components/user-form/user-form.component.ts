import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthentificationService } from 'src/app/shared/services/authentification.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  id: number = 0;
  token = localStorage.getItem('auth');
  admin = false;
  estateAgent = false;
  error: string = '';
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
    age: ['', Validators.required],
    phone: ['', Validators.required],
    admin: [false],
    estateAgent: [false],
    picture: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthentificationService
  ) {
    if (this.router.url.includes('add')) {
      this.id = 0;
    } else {
      this.route.params.subscribe((params) => {
        this.id = Number(params['id']);
      });
    }
  }

  ngOnInit(): void {
    if (this.token) {
      const decoded = jwtDecode<any>(this.token);
      if (decoded) {
        this.admin = decoded.admin;
      }
    }
    if (this.id > 0) {
      this.getUser(this.id);
    }
  }

  getUser(id: number): void {
    this.userService
      .getUser(id)
      .then((user) => {
        this.userForm.patchValue(user);
      })
      .catch((error) => (this.error = error.error.message));
  }

  submit(): void {
    if (this.id === 0) {
      this.userForm.value.picture = this.userForm.value.picture.name;
      this.userService
        .postUser(this.userForm.value)
        .then(() => {
          this.authService
            .loginUser(this.userForm.value)
            .then((result) => {
              this.token = result.token;
              if (!this.admin) {
                this.router.navigate(['/property']);
              }
              this.estateAgent = true;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => (this.error = error.error.message));
    }
    if (this.id > 0) {
      this.userForm.value.picture = this.userForm.value.picture.name;
      this.userService
        .putUser(this.id, this.userForm.value)
        .then(() => {
          this.router.navigate(['/property']);
        })
        .catch((error) => (this.error = error.error.message));
    }
  }
}
