import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/providers/guards/auth.guard';

import { LoginLayoutComponent } from 'src/main/layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from 'src/main/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        // canActivate: [LoginGuard],
        loadChildren: '../main/views/login/login.module#LoginModule'
      },
      // {
      //   path: '**',
      //   redirectTo: '/login',
      // }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    // canActivateChild: [SessionGuard],
    children: [
      {
        path: 'home',
        loadChildren: '../main/views/home/home.module#HomeModule'
      },
      // {
      //   path: 'not-found',
      //   loadChildren: '../main/views/not-found/not-found.module#NotFoundModule'
      // },
      // {
      //   path: 'profile',
      //   loadChildren: '../main/views/profile/profile.module#ProfileModule'
      // },
      // {
      //   path: '**',
      //   redirectTo: '/not-found',
      //   pathMatch: 'full'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesModule { }
