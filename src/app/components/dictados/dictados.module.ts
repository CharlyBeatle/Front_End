import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DictadoComponent } from './dictado/dictado.component';
import { DictadosRoutingModule } from './dictados.routing.module';
import { ListadictadoComponent } from './listadictado/listadictado.component';

const modules = [CommonModule,DictadosRoutingModule];

const components = [DictadoComponent,ListadictadoComponent];

@NgModule({
    imports: [modules],
    exports: [components],
    declarations: [components]
})
export class DictadosModule { }
