import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfilDTO } from 'src/app/services/models/perfil';
import { PerfilService } from 'src/app/services/perfil.service';
import Swal from 'sweetalert2';
import { PerfilComponent } from '../perfil/perfil.component';

@Component({
  selector: 'app-perfil-detalle',
  templateUrl: './perfil-detalle.component.html',
  styleUrls: ['./perfil-detalle.component.css']
})
export class PerfilDetalleComponent implements OnInit {
  formPerfil: FormGroup;
  perfilObj: PerfilDTO = {};

  constructor(private fb: FormBuilder,
              private service: PerfilService,
              public dialogRef: MatDialogRef<PerfilComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.buildForm().then(() => {
      if(this.data.data !== undefined) {
        this.perfilObj = this.data.data;
        this.formularioControls.nombre.setValue(this.perfilObj.nombre);
        this.formularioControls.tipo.setValue(this.perfilObj.Tipo);
      }
    });
  }

  async buildForm(): Promise<void> {
    this.formPerfil = this.fb.group({
      nombre: new FormControl('',[Validators.required]),
      // estado: new FormControl('',[Validators.required]),
      tipo: new FormControl('',[Validators.required])
    });
  }

  get formularioControls(): FormGroup['controls'] {
    return this.formPerfil.controls;
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if(this.formPerfil.valid) {
      const perfil: PerfilDTO = {
        idPerfil: this.perfilObj.idPerfil,
        nombre: this.formularioControls.nombre.value,
        Tipo: this.formularioControls.tipo.value,
        estado: this.perfilObj.estado !== null ? this.perfilObj.estado : true
      }

      this.service.save(perfil).subscribe({
        next: () => {
          Swal.fire('','Perfil Guardado Correctamente','success');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

}
