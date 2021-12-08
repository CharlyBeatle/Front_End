import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-perfil-detalle',
  templateUrl: './perfil-detalle.component.html',
  styleUrls: ['./perfil-detalle.component.css']
})
export class PerfilDetalleComponent implements OnInit {
  formPerfil: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formPerfil = this.fb.group({
      nombre: new FormControl('',[Validators.required]),
      estado: new FormControl('',[Validators.required]),
    });
  }

  get formularioControls(): FormGroup['controls'] {
    return this.formPerfil.controls;
  }

}
