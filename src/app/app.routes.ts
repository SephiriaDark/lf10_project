import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'callback',
    loadComponent: () => import('./callback/callback.component').then(m => m.CallbackComponent)
  },

  //Main Layout with Child Pages
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'employees',
        loadComponent: () => import('./employee-list/employee-list.component').then(m => m.EmployeeListComponent)
      },
      {
        path: 'qualifications',
        loadComponent: () => import('./qualification-list/qualification-list.component').then(m => m.QualificationListComponent)
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];


