import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../shared/services/authentification.service';
('');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  token = localStorage.getItem('auth');
  errorMessage: string = '';
  userForm = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(
    private authService: AuthentificationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('auth');
  }

  login() {
    this.authService
      .loginUser(this.userForm.value)
      .then((result) => {
        this.token = result.token;
        this.router.navigate(['/property']);
      })
      .catch((error) => (this.errorMessage = error.error.message));
  }
}
