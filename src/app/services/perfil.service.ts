import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'
import { PerfilDTO } from './models/perfil';
import { UsuarioDTO } from './models/usuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private urlService: string;

  constructor(private client: HttpClient) {
    this.urlService = `${environment.urlBack}/Perfil`;
  }

  
  getList(): Observable<any> {
    return this.client.get(`${this.urlService}`);
  }

  getUsuario(id: string): Observable<any> {
    return this.client.get(`${this.urlService}/GetPerfilById?id=${id}`);
  }

  save(perfil: PerfilDTO): Observable<any> {
    return this.client.post(`${this.urlService}/SavePerfil`, perfil);
  }
}