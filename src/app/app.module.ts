import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/shared/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import appRoutes from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component';
import { DictadoComponent } from './components/dictado/dictado.component';
import { ListadictadoComponent } from './components/listadictado/listadictado.component';
import { DictadoService } from './services/dictado.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    PerfilComponent,
    UsuarioComponent,
    PerfilusuarioComponent,
    DictadoComponent,
    ListadictadoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    DictadoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
