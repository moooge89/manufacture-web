import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  // {
  //   path: 'main',
  //   loadChildren: () => import('./main/main.module').then(m => m.MainModule),
  //   canLoad: [IsLoggedInGuard],
  // },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {initialNavigation: 'enabled'}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
