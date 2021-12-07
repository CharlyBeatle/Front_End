import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PerfilComponent } from "./perfil/perfil.component";
import { UsuarioComponent } from "./usuario/usuario.component";

const routes: Routes = [
    {   path : 'perfil',    
        component: PerfilComponent,
        data: {
            permisos : ['ADMIN']
        }
    },
    {   path : 'usuario',    
        component: UsuarioComponent,
        data: {
            permisos : ['ADMIN']
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministracionRoutingModule {}