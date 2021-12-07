import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    {   path : 'login',    
        component: LoginComponent,
        data: {
            permisos : ['ADMIN','USER']
        }
    },
    {   path : 'home',    
        component: HomeComponent,
        data: {
            permisos : ['ADMIN','USER']
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SharedRoutingModule {}