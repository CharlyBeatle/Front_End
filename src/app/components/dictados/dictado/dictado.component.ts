import { Component, OnInit } from '@angular/core';
import { DictadoService } from 'src/app/services/dictado.service';
declare var ABCJS: any;
// import * as abcJS from '../../../assets/js/abc.js';
import abcjsx from 'abcjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DictadoGenerado } from 'src/app/services/models/dictadoGenerado';
import Swal from 'sweetalert2';
import { DictadoDTO } from 'src/app/services/models/dictado';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dictado',
  templateUrl: './dictado.component.html',
  styleUrls: ['./dictado.component.css']
})
export class DictadoComponent implements OnInit {
  formConsulta: FormGroup;
  formGuardar: FormGroup;
  showAudio = false;
  dictadoOriginal: string = '';
  dictadoObj: any;
  dictadoObjRespuesta: any;
  dictadoRespuesta = '';
  dictadoGenerado: DictadoGenerado;
  botones: any[];
  showBotonesAcciones = false;
  conteoCompas: number = 0;
  cantidadNotas: number = 0;
  longitudCompas: number = 0;
  conteoCantidadCompas: number = 0;
  cantidadCompas: number = 0;
  compas: string[] = [];
  constructor(private service: DictadoService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.buildForms();
  }

  buildForms(): void {
    this.formConsulta = this.fb.group({
      dificultad: new FormControl('', [Validators.required])
    });

    this.formGuardar = this.fb.group({
      dictado: new FormControl('',[])
    });
  }


	initEditor() {
    
		 this.dictadoObj = new abcjsx.Editor('abc',
    {
        paper_id: 'paper',
        generate_midi: true,
        synth: {el: '#audio',options: { displayPlay: true, displayWarp: true, 
          displayProgress: true, qpm: 40, defaultQpm: 60}},
        abcjsParams: {
            // Add any other MIDI options from "Audio" page.
        },
    });

    this.dictadoObj.setNotDirty();
    this.dictadoObj.setReadOnly(false);
  }
  
  generar(){
    this.dictadoRespuesta = '';
    this.cantidadNotas = 0;
    this.compas = [];
    this.conteoCantidadCompas = 0;
    this.showAudio = false;
    if(this.formConsulta.valid) {
      this.showAudio = true;
      const dificultad = this.formConsulta.controls.dificultad.value;
      this.service.getNew(dificultad).subscribe(
        res => {
          this.dictadoGenerado = res;
          this.dictadoOriginal = res.TextoDictado;
          this.botones = res.MetricaNotas.Figuras;
          this.conteoCompas = 0;
          this.longitudCompas = Number(res.Metrica.split('/')[0]);
          this.cantidadCompas = res.CantidadCompas;
          setTimeout(this.initEditor,50); 
          var element = document.getElementById('abc');
          this.showBotonesAcciones = true;
          var event = new Event('change');
          element.dispatchEvent(event);
          this.initEditorRespuesta(res.Metrica);
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
    
  }


  initEditorRespuesta(metrica: string) {
    this.dictadoRespuesta = `M: ${metrica !== undefined ?
                            metrica : ''} \n|  `;
    this.formGuardar.controls.dictado.setValue(this.dictadoRespuesta);
    this.dictadoObjRespuesta = new abcjsx.Editor('abcRespuesta',
    {
       paper_id: 'paperRespuesta',
       generate_midi: true,
       synth: {el: '#audioRespuesta',options: { displayPlay: true, displayWarp: true, 
         displayProgress: true, qpm: 40, defaultQpm: 60}},
       abcjsParams: {
       }
    });


   this.dictadoObjRespuesta.setNotDirty();
   this.dictadoObjRespuesta.setReadOnly(false);
   var element = document.getElementById('abcRespuesta');
    var event = new Event('change');
    element.dispatchEvent(event);
 }

 agregarNota(valor: string, unidad: number): void {
   if((this.conteoCompas + unidad) >= this.longitudCompas) {
      // this.dictadoRespuesta += `${this.dictadoGenerado.Nota}${valor}| `;
      if ( this.compas[this.conteoCantidadCompas -1] !== '') {
        this.compas[this.conteoCantidadCompas -1] += ` ${this.dictadoGenerado.Nota}${valor}`; 
        this.dictadoRespuesta += ` ${this.dictadoGenerado.Nota}${valor}| `;
        this.cantidadNotas += 1;
      } else {
        this.compas[this.conteoCantidadCompas -1] += ` ${this.dictadoGenerado.Nota}${valor}`;
        this.dictadoRespuesta += `${this.dictadoGenerado.Nota}${valor}| `;
        this.cantidadNotas = 1;
      }
    
      this.conteoCompas = 0;
      if(this.conteoCantidadCompas === this.cantidadCompas) {
        this.conteoCantidadCompas += 1;
        this.dictadoRespuesta = this.dictadoRespuesta.substring(0,this.dictadoRespuesta.length - 1);
      } 
      
    
   } else {
      // this.dictadoRespuesta += `${this.dictadoGenerado.Nota}${valor} `; 
      if (this.conteoCompas === 0) {
        this.conteoCantidadCompas += 1;
        this.compas[this.conteoCantidadCompas -1] = `${this.dictadoGenerado.Nota}${valor}`; 
        this.dictadoRespuesta += `${this.dictadoGenerado.Nota}${valor}`;
        this.cantidadNotas = 1;
      }
      else {
        this.compas[this.conteoCantidadCompas -1] += ` ${this.dictadoGenerado.Nota}${valor}`;
        this.dictadoRespuesta += ` ${this.dictadoGenerado.Nota}${valor}`;
        this.cantidadNotas += 1;
      }
      this.conteoCompas += unidad;
   }
   
   this.formGuardar.controls.dictado.setValue(this.dictadoRespuesta);
   var element = document.getElementById('abcRespuesta');
   var event = new Event('change');
   element.dispatchEvent(event);
 }

 validarCantidadCompas(): boolean {
   if(this.conteoCantidadCompas <= this.cantidadCompas) {
     return true;
   } else {
     return false;
   }
 }

 borrarUltima(): void {
   
   const notas = (this.cantidadNotas - 1) * 2;
   const espacios = (this.cantidadNotas > 2 ? (this.cantidadNotas - 2) * 1 : 0);
   if(this.compas.length !== 0 && this.compas[this.conteoCantidadCompas - 1] !== '') {
      console.log(this.conteoCantidadCompas);
      const valores = this.compas[this.conteoCantidadCompas - 1];
      this.cantidadNotas -= 1;
      console.log(valores);
      console.log(notas+espacios);
      this.compas[this.conteoCantidadCompas - 1] = valores.substring(0,notas+espacios);
      console.log(this.compas);
      this.actualizarDictado();
   }

   if(this.compas.length > 1 && this.compas[this.conteoCantidadCompas - 1] === '') {
    console.log('qqq');
    this.compas.pop();
    this.conteoCantidadCompas -= 1;
    this.cantidadNotas = this.compas[this.conteoCantidadCompas - 1].split(' ').length;
    console.log(this.compas);
    this.actualizarDictado();
   }
 }

 borrarCompas(): void {
  if(this.compas.length !== 0 && this.compas[this.conteoCantidadCompas - 1] !== '') {
    this.compas.pop();
    console.log(this.compas);
  }
 }

 guardar(): void {
  console.log('Original ',this.dictadoOriginal);
  console.log('Respuesta ',this.dictadoRespuesta);
    Swal.fire(
      { title: 'Validar y Guardar Dictado',
        text:'¿Esta seguro de realizar la acción?',
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        showCloseButton: true
  }).then(result => {
      if(result.value) {
        const resultado: DictadoDTO = {
          idTipo: this.formConsulta.controls.dificultad.value,
          fecha: new Date(),
          calificacion: this.dictadoOriginal === this.dictadoRespuesta,
          detalle: {
            dictadoOriginal: this.dictadoOriginal,
            dictadoRespuesta: this.dictadoRespuesta
          },
          usuario: sessionStorage.getItem('username')
        };

        this.service.saveDictado(resultado).subscribe({
          next: (res) => {
            Swal.fire('',`El dictado tiene un resultado ${ (resultado.calificacion ? 'correcto' : 'incorrecto')}. ${(resultado.calificacion ? '' : 'Intentelo nuevamente en otro nuevo ejercicio.')}`
                      , resultado.calificacion ? 'success' : 'error');
            this.router.navigateByUrl('home');
            
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    })
 }

 actualizarDictado(): void {
  this.dictadoRespuesta = `M: ${this.dictadoGenerado.Metrica} \n|  `;
   setTimeout(() => {
     this.compas.forEach(element => {
       this.dictadoRespuesta += `${element} | `;
     });
   }, 200);
   this.formGuardar.controls.dictado.setValue(this.dictadoRespuesta);
   console.log(this.dictadoRespuesta);
   var element = document.getElementById('abcRespuesta');
   var event = new Event('change');
   element.dispatchEvent(event);
 }

 borrarTodo(): void {
  this.compas = [];
  this.conteoCantidadCompas = 0;
  this.conteoCompas = 0;
  this.dictadoRespuesta = `M: ${this.dictadoGenerado.Metrica} \n|  `;
  console.log(this.dictadoRespuesta);
  this.formGuardar.controls.dictado.setValue(this.dictadoRespuesta);
   var element = document.getElementById('abcRespuesta');
   var event = new Event('change');
   element.dispatchEvent(event);
 }
}
