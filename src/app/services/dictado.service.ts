import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'
import { DictadoGenerado } from './models/dictadoGenerado';

@Injectable({
  providedIn: 'root'
})
export class DictadoService {

  private urlService: string;

  constructor(private client: HttpClient) {
    this.urlService = `${environment.urlBack}/Dictado`;
  }

  
  getList(): Observable<any> {
    return this.client.get(`${this.urlService}`);
  }

  getNew(dificultad: number): Observable<DictadoGenerado> {
    return this.client.get(`${this.urlService}/GetDictado?dificultad=${dificultad}`);
  }

//   save(model: TransaccionPuntosDTO): Observable<any>{
//     return this.client.post(`${this.urlService}`, model);
//   }

//   delete(id: number): Observable<any> {
//     const option: any = {params : null};
//     const params = new HttpParams().set('id', id.toString());
//     option.params = params;
//     return this.client.delete(`${this.urlService}`, option);
//   }
}
