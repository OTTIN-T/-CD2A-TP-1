import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/shared/models/property.model';
import { PropertyService } from '../../shared/services/property.service';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
})
export class PropertyListComponent implements OnInit {
  token = localStorage.getItem('auth');
  constructor(
    public propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  properties: Property[] = [];

  ngOnInit(): void {
    // if (!this.token) {
    //   this.router.navigate(['/login']);
    // }
    this.getProperties();
  }

  getProperties() {
    this.propertyService
      .getProperties()
      .then((properties) => {
        this.properties = properties;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
