import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { SessionGuard } from '@guards/session.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    // canActivate: [ SessionGuard ],
  },
  {
    path: 'repositories',
    loadChildren: () => import('./pages/repositories/repositories.module').then( m => m.RepositoriesPageModule),
    canActivate: [ AuthGuard ],
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule),
    canActivate: [ AuthGuard ],
  },
  {
    path: 'repo',
    loadChildren: () => import('./pages/repo/repo.module').then( m => m.RepoPageModule),
    canActivate: [ AuthGuard ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
