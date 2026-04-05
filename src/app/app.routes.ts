import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AboutUs } from './components/about-us/about-us';
import { ContactUs } from './components/contact-us/contact-us';
import { Login } from './auth/login/login';
import { Courses } from './components/courses/courses';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [ //first match wins
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // /
  { path: 'home', component: Home },
  { path: 'about-us', component: AboutUs },
  { path: 'contact-us', component: ContactUs },
  { path: 'login', component: Login },
  { path: 'courses', component: Courses },
  { path: '**', component: NotFound },//wildcard route
];
