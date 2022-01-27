import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VentanaModalComponent } from 'src/app/components/shared/modal/ventana-modal.component';
import { PerfilDTO } from 'src/app/services/models/perfil';
import { PerfilService } from 'src/app/services/perfil.service';
import Swal from 'sweetalert2';
import { PerfilDetalleComponent } from '../perfil-detalle/perfil-detalle.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent  {

  datos: PerfilDTO[] = [];
  displayedColumns: string[] = ['idPerfil', 'nombrePerfil','estado', 'detalle'];
  dataSource: MatTableDataSource<PerfilDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              private service: PerfilService) {
    this.getUsuarios();
    
  }

  getUsuarios(): void {
    this.service.getList().subscribe({
      next: (resp) => {
        console.log(resp);
        this.datos = resp;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  edit(perfil: PerfilDTO): void {
    const componente = PerfilDetalleComponent;
    const titulo = 'Editar Perfil';
    const modal = this.dialog.open(VentanaModalComponent, {
      width: '20vw',
      disableClose: true,
      data: {
        dataComponent: { title: titulo },
        component:  componente,
        data: perfil
      }
    
    });

    modal.afterClosed().subscribe((result) => {
      console.log(result);
      this.getUsuarios();
    });
  }

  new(): void {
    const componente = PerfilDetalleComponent;
    const titulo = 'Nuevo Perfil';
    const modal = this.dialog.open(VentanaModalComponent, {
      width: '20vw',
      disableClose: true,
      data: {
        dataComponent: { title: titulo },
        component:  componente
      }
    });

    modal.afterClosed().subscribe((result) => {
      console.log(result);
      this.getUsuarios();
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cambiarEstado(perfil: PerfilDTO): void {
    Swal.fire(
      { title:'Cambio Estado Perfil',
        text: `¿Esta seguro de realizar el cambio de estado del perfil ${perfil.nombre}?`,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
              }).then((result) => {
      if(result.value) {
        perfil.estado = !perfil.estado;
        this.service.save(perfil).subscribe({
          next: () => {
            Swal.fire('',`El perfil ${perfil.nombre} se encuentra ahora ${perfil.estado ? 'activo': 'inactivo'}`,'info');
          }
        });
      }
    });
  }

}
