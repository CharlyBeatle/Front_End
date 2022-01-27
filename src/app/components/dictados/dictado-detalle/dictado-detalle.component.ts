import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DictadoDTO } from 'src/app/services/models/dictado';
import abcjsx from 'abcjs';

@Component({
  selector: 'app-dictado-detalle',
  templateUrl: './dictado-detalle.component.html',
  styleUrls: ['./dictado-detalle.component.css']
})
export class DictadoDetalleComponent implements OnInit {
  dictado: DictadoDTO;
  dictadoObj: any;
  dictadoObjRespuesta: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dictado = this.data.data;
    setTimeout(this.initEditor,50); 
    var element = document.getElementById('abc');
    var event = new Event('change');
    element.dispatchEvent(event);

    var element2 = document.getElementById('abcRespuesta');
    var event2 = new Event('change');
    element2.dispatchEvent(event2);
  }

  initEditor() {
    console.log(this.dictado);
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
 }

}
