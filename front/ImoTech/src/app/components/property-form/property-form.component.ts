import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Tag } from 'src/app/shared/models/tag.model';
import { PropertyService } from 'src/app/shared/services/property.service';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss'],
})
export class PropertyFormComponent implements OnInit {
  token = localStorage.getItem('auth');
  id: number = 0;
  errorMessage: string = '';
  propertyForm = this.fb.group({
    title: ['', Validators.required],
    picture: ['', Validators.required],
    address: ['', Validators.required],
    price: ['', Validators.required],
    sector: ['', Validators.required],
    room: ['', Validators.required],
    description: ['', Validators.required],
    advantage: ['', Validators.required],
    tags: ['', Validators.required],
  });

  tags: Tag[] = [] as Tag[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tagService: TagService,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    if (!this.token) {
      this.router.navigate(['/login']);
    }
    if (this.token) {
      const decoded = jwtDecode<any>(this.token);
      if (!decoded.admin && !decoded.estateAgent) {
        this.router.navigate(['/property']);
      }
    }
    this.getTags();
    if (this.router.url.includes('edit')) {
      this.id = Number(this.router.url.split('/')[2]);
      this.getProperty(Number(this.id));
    }
  }

  getTags(): void {
    this.tagService
      .getTags()
      .then((tags) => {
        this.tags = tags;
      })
      .catch((error) => (this.errorMessage = error.error.message));
  }

  getProperty(id: number): void {
    this.propertyService
      .getProperty(id)
      .then((property) => {
        this.propertyForm.patchValue(property);
      })
      .catch((error) => (this.errorMessage = error.error.message));
  }

  submit(): void {
    if (this.id === 0) {
      this.propertyForm.value.picture = this.propertyForm.value.picture.name;
      this.propertyService
        .postProperty(this.propertyForm.value)
        .then(() => {
          this.router.navigate(['/property']);
        })
        .catch((error) => (this.errorMessage = error.error.message));
    }
    if (this.id !== 0) {
      this.propertyForm.value.picture = this.propertyForm.value.picture.name;
      this.propertyService
        .putProperty(this.id, this.propertyForm.value)
        .then((result) => {
          this.router.navigate(['/property']);
        })
        .catch((error) => (this.errorMessage = error.error.message));
    }
  }
}
