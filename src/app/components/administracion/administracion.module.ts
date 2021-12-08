import { NgModule } from '@angular/core';
import { AdministracionRoutingModule } from './administracion.routing.module';
import { PerfilComponent } from './perfil/perfil/perfil.component';
import { PerfilusuarioComponent } from './perfilusuario/perfilusuario.component';
import { UsuarioComponent } from './usuario/usuario/usuario.component';
import { UsuarioDetalleComponent } from './usuario/usuario-detalle/usuario-detalle.component';
import { PerfilDetalleComponent } from './perfil/perfil-detalle/perfil-detalle.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [CommonModule,AdministracionRoutingModule,MaterialModule,FormsModule,ReactiveFormsModule];
const components = [PerfilComponent,PerfilusuarioComponent,UsuarioComponent,UsuarioDetalleComponent,PerfilDetalleComponent];
@NgModule({
    imports: [modules],
    exports: [components],
    declarations: [components]
})
export class AdministracionModule { }
