import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('@features/home/home-page').then((m) => m.HomePage),
      },
      {
        path: 'profile',
        loadComponent: () => import('@features/profile/profile-page').then((m) => m.ProfilePage),
      },
      { path: '', redirectTo: '/tabs/home', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/tabs/home', pathMatch: 'full' },
];
