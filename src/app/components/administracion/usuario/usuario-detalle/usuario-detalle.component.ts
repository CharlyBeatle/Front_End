import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfilDTO } from 'src/app/services/models/perfil';
import { UsuarioDTO } from 'src/app/services/models/usuario';
import { PerfilService } from 'src/app/services/perfil.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {
  formUsuario: FormGroup;
  perfiles: PerfilDTO[] = [];
  constructor(private fb: FormBuilder,
              private service: UsuarioService,
              private perfilService: PerfilService,
              public dialogRef: MatDialogRef<UsuarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getPerfiles();
    this.buildForm().then(
      ()=> {
        if (this.data.data !== undefined) {
          const datos: UsuarioDTO = this.data.data;
          this.formularioControls.nombreUsuario.setValue(datos.nombre);
          this.formularioControls.perfil.setValue(datos.idPerfil);
          this.formularioControls.correo.setValue(datos.correo);
          this.formularioControls.username.setValue(datos.idUsuario);
          this.formularioControls.password.setValue(datos.password);
        }
      }
    );
  }

  async buildForm(): Promise<void> {
    this.formUsuario = this.fb.group({
      nombreUsuario: new FormControl('',[Validators.required]),
      perfil: new FormControl('',[Validators.required]),
      correo: new FormControl('',[Validators.required,Validators.email]),
      username: new FormControl({value: '', disabled: false},[Validators.required]),
      password: new FormControl('',[Validators.required]),
      // estado: new FormControl('',[Validators.required])
    });
  }

  get formularioControls(): FormGroup['controls'] {
    return this.formUsuario.controls;
  }

  save(): void {
    console.log(this.formUsuario);
    if (this.formUsuario.valid) {
      const usuario: UsuarioDTO = {
        idUsuario: this.formularioControls.username.value,
        idPerfil : this.formularioControls.perfil.value,
        nombre: this.formularioControls.nombreUsuario.value,
        correo: this.formularioControls.correo.value,
        username: this.formularioControls.username.value,
        password: this.formularioControls.password.value,
        estado: true
      };

      this.service.save(usuario).subscribe({
        next: (res) => {
          Swal.fire('','Usuario Guardado Correctamente','success');
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  getPerfiles(): void {
    this.perfilService.getList().subscribe({
      next: (res: PerfilDTO[]) => {
        console.log('perfiles',res);
        this.perfiles = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }



}
