import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoleAuthGuard } from "src/app/services/profile-auth-guard.service";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    {   path : 'login',    
        component: LoginComponent,
    },
    {   path : 'home',    
        component: HomeComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SharedRoutingModule {}