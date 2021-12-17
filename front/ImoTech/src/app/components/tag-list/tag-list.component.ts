import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from 'src/app/shared/models/tag.model';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
  tags: Tag[] = [] as Tag[];
  token = localStorage.getItem('auth');

  constructor(private tagService: TagService, private router: Router) {}

  ngOnInit(): void {
    if (!this.token) {
      this.router.navigate(['/login']);
    }
    this.getTags();
  }

  getTags() {
    this.tagService
      .getTags()
      .then((tags) => {
        this.tags = tags;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
