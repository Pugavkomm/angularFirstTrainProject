import {Routes} from '@angular/router';
import {HomeComponent} from './routes/home/home.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./routes/auth/sing-in/sing-in.component').then(c => c.SingInComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./routes/auth/sing-up/sing-up.component').then(c => c.SingUpComponent)
  },
  {
    path: '',
    component: HomeComponent,
  },
];
