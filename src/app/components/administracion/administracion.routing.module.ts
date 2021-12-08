import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoleAuthGuard } from "src/app/services/profile-auth-guard.service";
import { PerfilComponent } from "./perfil/perfil/perfil.component";
import { PerfilusuarioComponent } from "./perfilusuario/perfilusuario.component";
import { UsuarioComponent } from "./usuario/usuario/usuario.component";

const routes: Routes = [
    {   path : 'perfil',    
        component: PerfilComponent,
        data: {
            permisos : ['ADMIN']
        },
        canActivate : [RoleAuthGuard]
    },
    {   path : 'usuario',    
        component: UsuarioComponent,
        data: {
            permisos : ['ADMIN']
        },
        canActivate : [RoleAuthGuard]
    },
    {   path : 'perfilUsuario',    
        component: PerfilusuarioComponent,
        data: {
            permisos : ['ADMIN','USER']
        },
        canActivate : [RoleAuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministracionRoutingModule {}