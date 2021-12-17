import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyComponent } from './components/property/property.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TagFormComponent } from './components/tag-form/tag-form.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagComponent } from './components/tag/tag.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/add', component: UserFormComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'user/:id/edit', component: UserFormComponent },
  { path: 'user/list', component: UserListComponent },
  { path: 'property/add', component: PropertyFormComponent },
  { path: 'property/:id', component: PropertyComponent },
  { path: 'property/:id/edit', component: PropertyFormComponent },
  { path: 'property', component: PropertyListComponent },
  { path: 'tag/add', component: TagFormComponent },
  { path: 'tag/:id', component: TagComponent },
  { path: 'tag/:id/edit', component: TagFormComponent },
  { path: 'tags/list', component: TagListComponent },
  { path: 'search', component: SearchBarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
