import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoleAuthGuard } from "src/app/services/profile-auth-guard.service";
import { DictadoComponent } from "./dictado/dictado.component";
import { ListadictadoComponent } from "./listadictado/listadictado.component";

const routes: Routes = [
    {   path : 'dictado',    
        component: DictadoComponent,
        data: {
            permisos : ['ADMIN','USUARIO']
        },
        canActivate : [RoleAuthGuard]
    },
    {   path : 'lista-dictado',    
        component: ListadictadoComponent,
        data: {
            permisos : ['ADMIN','USUARIO']
        },
        canActivate : [RoleAuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DictadosRoutingModule {}