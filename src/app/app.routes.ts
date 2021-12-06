import { Routes } from '@angular/router';
import { DictadoComponent } from './components/dictado/dictado.component';
import { HomeComponent } from "./components/home/home.component";
import { ListadictadoComponent } from './components/listadictado/listadictado.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'roles', component: PerfilComponent },
    { path: 'user', component: UsuarioComponent },
    { path: 'profile', component: PerfilusuarioComponent },
    { path: 'dictado', component: DictadoComponent },
    { path: 'listaDictado', component: ListadictadoComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
  ];
  export default appRoutes;