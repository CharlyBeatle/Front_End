import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { DictadoComponent } from './dictado/dictado.component';
import { DictadosRoutingModule } from './dictados.routing.module';
import { ListadictadoComponent } from './listadictado/listadictado.component';
import { DictadoDetalleComponent } from './dictado-detalle/dictado-detalle.component';

const modules = [CommonModule,DictadosRoutingModule,MaterialModule];

const components = [DictadoComponent,ListadictadoComponent,DictadoDetalleComponent];

@NgModule({
    imports: [modules],
    exports: [components],
    declarations: [components, ]
})
export class DictadosModule { }
