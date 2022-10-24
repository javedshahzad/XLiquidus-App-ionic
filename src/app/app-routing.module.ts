import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GenralPagesModule)
  },
  {
    path: 'user-panel',
    loadChildren: () => import('./user-panel/user-panel.module').then(m => m.UserPanelPageModule),
  },
  {
    path: 'token-expires',
    loadChildren: () => import('./general-pages/token-expires/token-expires.module').then( m => m.TokenExpiresPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),// { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
