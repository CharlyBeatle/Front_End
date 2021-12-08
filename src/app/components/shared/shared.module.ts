import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { VentanaModalComponent } from './modal/ventana-modal.component';
import { SharedRoutingModule } from './shared.routing.module';

const modules = [
                CommonModule,
                MaterialModule,
                FormsModule,
                NgbModule,
                SharedRoutingModule];
const components = [HomeComponent,LoginComponent,MenuComponent,VentanaModalComponent];
@NgModule({
    imports: [modules],
    exports: [MenuComponent],
    declarations: [components]
})
export class SharedModule { }
