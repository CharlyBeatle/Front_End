import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routes';
import { DictadoService } from './services/dictado.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './components/shared/shared.module';
import { RoleAuthGuard } from './services/profile-auth-guard.service';
import { UsuarioService } from './services/usuario.service';

const services = [DictadoService, UsuarioService, RoleAuthGuard]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [CommonModule,
            BrowserModule,
            BrowserAnimationsModule,
            AppRoutingModule,
            MaterialModule,
            HttpClientModule,
            SharedModule
    ],
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule { }
