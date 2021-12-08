import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {
  formUsuario: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formUsuario = this.fb.group({
      nombreUsuario: new FormControl('',[Validators.required]),
      perfil: new FormControl('',[Validators.required]),
      correo: new FormControl('',[Validators.required,Validators.email]),
      username: new FormControl({value: '', disabled: false},[Validators.required]),
      password: new FormControl('',[Validators.required]),
      estado: new FormControl('',[Validators.required])
    });
  }

  get formularioControls(): FormGroup['controls'] {
    return this.formUsuario.controls;
  }



}
