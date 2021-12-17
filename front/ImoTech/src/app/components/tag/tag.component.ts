import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from 'src/app/shared/models/tag.model';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() tag?: Tag;

  token = localStorage.getItem('auth');
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tagService: TagService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    if (!this.token) {
      this.router.navigate(['/login']);
    }
  }
}
