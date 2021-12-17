import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/shared/models/property.model';
import { PropertyService } from '../../shared/services/property.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit {
  @Input() property?: Property;
  token = localStorage.getItem('auth');
  id: number = 0;
  admin: boolean = false;
  estateAgent: boolean = false;

  constructor(
    public propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    if (!this.token) {
      this.router.navigate(['/login']);
    }
    if (this.token) {
      const decoded = jwtDecode<any>(this.token);
      if (decoded) {
        this.admin = decoded.admin;
        this.estateAgent = decoded.estateAgent;
      }
    }
    if (this.id > 0) {
      this.getProperty();
    }
  }

  getProperty() {
    this.propertyService
      .getProperty(this.id)
      .then((property) => {
        this.property = property;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteProperty(id: number) {
    this.propertyService
      .deleteProperty(id)
      .then((res) => {
        this.router.navigate(['/property']);
      })
      .catch((err) => console.log(err));
  }
}
