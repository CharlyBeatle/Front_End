import { NgModule } from '@angular/core';
import { AdministracionRoutingModule } from './administracion.routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { PerfilusuarioComponent } from './perfilusuario/perfilusuario.component';
import { UsuarioComponent } from './usuario/usuario.component';

const modules = [AdministracionRoutingModule];
const components = [PerfilComponent,PerfilusuarioComponent,UsuarioComponent];
@NgModule({
    imports: [modules],
    exports: [components],
    declarations: [components]
})
export class AdministracionModule { }
