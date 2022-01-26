import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VentanaModalComponent } from 'src/app/components/shared/modal/ventana-modal.component';
import { PerfilDTO } from 'src/app/services/models/perfil';
import { PerfilDetalleComponent } from '../perfil-detalle/perfil-detalle.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements AfterViewInit {

  datos: PerfilDTO[] = [];
  displayedColumns: string[] = ['idPerfil', 'nombrePerfil','estado', 'detalle'];
  dataSource: MatTableDataSource<PerfilDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    this.getUsuarios();
    
  }

  getUsuarios(): void {
    this.datos = [
      // {idPerfil: 1, nombrePerfil: 'Usuario Estándar', estado:true},
      // {idPerfil: 2, nombrePerfil: 'Administrador', estado:true}
    ]
    this.dataSource = new MatTableDataSource(this.datos);
  }

  edit(usuario: PerfilDTO): void {
    const componente = PerfilDetalleComponent;
    const titulo = 'Editar Perfil';
    const modal = this.dialog.open(VentanaModalComponent, {
      width: '50vw',
      disableClose: true,
      data: {
        dataComponent: { title: titulo },
        component:  componente,
        data: usuario
      }
    });
  }

  new(): void {
    const componente = PerfilDetalleComponent;
    const titulo = 'Nuevo Perfil';
    const modal = this.dialog.open(VentanaModalComponent, {
      width: '50vw',
      disableClose: true,
      data: {
        dataComponent: { title: titulo },
        component:  componente
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
