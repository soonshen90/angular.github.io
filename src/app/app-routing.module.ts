import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './public/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: ()=> import('src/app/public/public.module').then((m) => m.PublicModule)
  },
  {
    path: '',
    loadChildren: ()=> import('src/app/private/private.module').then((m) => m.PrivateModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: '404 Page Not Found'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
