import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VentanaModalComponent } from 'src/app/components/shared/modal/ventana-modal.component';
import { UsuarioDTO } from 'src/app/services/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { UsuarioDetalleComponent } from '../usuario-detalle/usuario-detalle.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements AfterViewInit {

  datos: UsuarioDTO[] = [];
  displayedColumns: string[] = ['idUsuario', 'nombre','nombrePerfil','estado', 'detalle'];
  dataSource: MatTableDataSource<UsuarioDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              private usuarioService: UsuarioService) {
    this.getUsuarios();
    
  }

  getUsuarios(): void {
    this.usuarioService.getList().subscribe(
      (res) => {
        this.datos = res;
        console.log(res);
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        Swal.fire('','Ocurrio un error consultando la información','error');
      }
    );
    
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

    modal.afterClosed().subscribe(res => {
      this.getUsuarios();
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

    modal.afterClosed().subscribe(res => {
      this.getUsuarios();
    });
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cambiarEstado(usuario: UsuarioDTO): void {
    Swal.fire(
      { title:'Cambio Estado Usuario',
        text: `¿Esta seguro de realizar el cambio de estado del usuario ${usuario.idUsuario}?`,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
              }).then((result) => {
      if(result.value) {
        usuario.estado = !usuario.estado;
        this.usuarioService.save(usuario).subscribe({
          next: () => {
            Swal.fire('',`El usuario ${usuario.idUsuario} se encuentra ahora ${usuario.estado ? 'activo': 'inactivo'}`,'info');
          }
        });
      }
    });
    
  }

}
