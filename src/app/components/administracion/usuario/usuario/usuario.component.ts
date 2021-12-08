import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VentanaModalComponent } from 'src/app/components/shared/modal/ventana-modal.component';
import { UsuarioDTO } from 'src/app/services/models/usuario';
import { UsuarioDetalleComponent } from '../usuario-detalle/usuario-detalle.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements AfterViewInit {

  datos: UsuarioDTO[] = [];
  displayedColumns: string[] = ['idUsuario', 'nombre', 'username','nombrePerfil','estado', 'detalle'];
  dataSource: MatTableDataSource<UsuarioDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    this.getUsuarios();
    
  }

  getUsuarios(): void {
    this.datos = [
      {idUsuario: 1, nombre: 'Juan Perez',nombrePerfil: 'Usuario Estándar', estado:true , username: 'juan.perez'},
      {idUsuario: 2, nombre: 'Juan Perez',nombrePerfil: 'Usuario Estándar', estado:true , username: 'juan.perez'},
      {idUsuario: 3, nombre: 'Juan Perez',nombrePerfil: 'Usuario Estándar', estado:true , username: 'juan.perez'},
      {idUsuario: 4, nombre: 'Juan Perez',nombrePerfil: 'Usuario Estándar', estado:true , username: 'juan.perez'},
      {idUsuario: 5, nombre: 'Juan Perez',nombrePerfil: 'Usuario Estándar', estado:true , username: 'juan.perez'},
      {idUsuario: 6, nombre: 'Juan Perez',nombrePerfil: 'Usuario Estándar', estado:true , username: 'juan.perez'}
    ]
    this.dataSource = new MatTableDataSource(this.datos);
  }

  edit(usuario: UsuarioDTO): void {
    const componente = UsuarioDetalleComponent;
    const titulo = 'Editar Usuario';
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
    const componente = UsuarioDetalleComponent;
    const titulo = 'Nuevo Usuario';
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
