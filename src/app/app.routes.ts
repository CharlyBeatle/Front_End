
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: 'dictados', loadChildren: () => import('./components/dictados/dictados.module').then( m => m.DictadosModule)},
    { path: 'common', loadChildren: () => import('./components/shared/shared.module').then( m => m.SharedModule)},
    { path: 'admin', loadChildren: () => import('./components/administracion/administracion.module').then( m => m.AdministracionModule)},
    { path: '', redirectTo: 'common/home', pathMatch: 'full' }
  ];

  @NgModule({
    imports: [
      RouterModule.forRoot(appRoutes, { useHash: true }),
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }