import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DictadoDTO } from 'src/app/services/models/dictado';
import { VentanaModalComponent } from '../../shared/modal/ventana-modal.component';
import { DictadoDetalleComponent } from '../dictado-detalle/dictado-detalle.component';


@Component({
  selector: 'app-listadictado',
  templateUrl: './listadictado.component.html',
  styleUrls: ['./listadictado.component.css']
})
export class ListadictadoComponent implements AfterViewInit {
  datos: DictadoDTO[] = [];
  displayedColumns: string[] = ['tipo', 'fecha', 'calificacion', 'detalle'];
  dataSource: MatTableDataSource<DictadoDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    this.getDictados();
    
  }

  getDictados() {
    this.datos = [
      {tipo: 'Básico', fecha: new Date(),calificacion: false},
      {tipo: 'Intermedio', fecha: new Date(),calificacion: true},
      {tipo: 'Avanzado', fecha: new Date(),calificacion: false},
      {tipo: 'Avanzado', fecha: new Date(),calificacion: true},
      {tipo: 'Básico', fecha: new Date(),calificacion: true}
    ]
    this.dataSource = new MatTableDataSource(this.datos);
  }

  verDetalle(dictado:DictadoDTO): void {
    const componente = DictadoDetalleComponent;
    const titulo = 'Detalle Dictado';
    const modal = this.dialog.open(VentanaModalComponent, {
      width: '70vw',
      disableClose: true,
      data: {
        dataComponent: { title: titulo },
        component:  componente,
        data: dictado
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

