import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss'],
})
export class TagFormComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tagService: TagService
  ) {}

  errorMessage: string = '';
  token = localStorage.getItem('auth');
  tagForm = this.fb.group({
    name: ['', Validators.required],
  });

  ngOnInit(): void {
    if (!this.token) {
      this.router.navigate(['/login']);
    }
  }

  submit(): void {
    this.tagService
      .postTag(this.tagForm.value)
      .then(() => {
        this.router.navigate(['/tags/list']);
      })
      .catch((error) => (this.errorMessage = error.error.message));
  }
}
