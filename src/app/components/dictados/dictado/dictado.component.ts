import { Component, OnInit } from '@angular/core';
import { DictadoService } from 'src/app/services/dictado.service';
declare var ABCJS: any;
// import * as abcJS from '../../../assets/js/abc.js';
import abcjsx from 'abcjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DictadoGenerado } from 'src/app/services/models/dictadoGenerado';

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
  conteoCompas: number = 0;
  longitudCompas: number = 0;
  conteoCantidadCompas: number = 0;
  cantidadCompas: number = 0;
  constructor(private service: DictadoService,
              private fb: FormBuilder) { }

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
          setTimeout(this.initEditor,500); 
          var element = document.getElementById('abc');
          
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
    console.log(metrica);
    this.dictadoRespuesta = `M: ${metrica !== undefined ?
                            metrica : ''} \n|`;
    this.formGuardar.controls.dictado.setValue(this.dictadoRespuesta);
    this.conteoCantidadCompas += 1;
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
   console.log(this.conteoCompas);
   if((this.conteoCompas + unidad) >= this.longitudCompas) {
    this.dictadoRespuesta += `${this.dictadoGenerado.Nota}${valor} | `;
    this.conteoCompas = 0;
    this.conteoCantidadCompas += 1;
   } else {
    this.dictadoRespuesta += `${this.dictadoGenerado.Nota}${valor} `;
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

 }

 borrarTodo(): void {
   this.conteoCantidadCompas = 1;
  this.conteoCompas = 0;
  this.dictadoRespuesta = `M: ${this.dictadoGenerado.Metrica} \n| `;
  console.log(this.dictadoRespuesta);
  this.formGuardar.controls.dictado.setValue(this.dictadoRespuesta);
   var element = document.getElementById('abcRespuesta');
   var event = new Event('change');
   element.dispatchEvent(event);
 }
}
