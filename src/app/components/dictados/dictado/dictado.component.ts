import { Component, OnInit } from '@angular/core';
import { DictadoService } from 'src/app/services/dictado.service';
declare var ABCJS: any;
// import * as abcJS from '../../../assets/js/abc.js';
import abcjsx from 'abcjs';

@Component({
  selector: 'app-dictado',
  templateUrl: './dictado.component.html',
  styleUrls: ['./dictado.component.css']
})
export class DictadoComponent implements OnInit {

  dictadoOriginal: string = '';
  dictadoObj: any;
  constructor(private service: DictadoService) { }

  ngOnInit(): void {
    
    this.service.getNew(3).subscribe(
      res => {
        this.dictadoOriginal = res.TextoDictado;
        this.initEditor();
        
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
    
  }

	initEditor() {
    
		 this.dictadoObj = new abcjsx.Editor(
    "abc",
    {
        paper_id: "paper",
        generate_midi: true,
        //midi_id: "audio",
        synth: {el: "#audio2",options: { displayPlay: true, displayWarp: true, 
          displayProgress: true, qpm: 40, defaultQpm: 60}},
        abcjsParams: {
            // Add any other MIDI options from "Audio" page.
        },
    });

    this.dictadoObj.setNotDirty();
    this.dictadoObj.setReadOnly(false);
  }
  
  prueba(){
    var element = document.getElementById("abc");
    var event = new Event('change');
    element.dispatchEvent(event);
  }
}
