import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DictadoComponent } from "./dictado/dictado.component";
import { ListadictadoComponent } from "./listadictado/listadictado.component";

const routes: Routes = [
    {   path : 'dictado',    
        component: DictadoComponent,
        data: {
            permisos : ['ADMIN','USER']
        }
    },
    {   path : 'lista-dictado',    
        component: ListadictadoComponent,
        data: {
            permisos : ['ADMIN','USER']
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DictadosRoutingModule {}