import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'
import { UsuarioDTO } from './models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlService: string;

  constructor(private client: HttpClient) {
    this.urlService = `${environment.urlBack}/Usuario`;
  }

  
  getList(): Observable<any> {
    return this.client.get(`${this.urlService}`);
  }

  getUsuario(id: string): Observable<any> {
    return this.client.get(`${this.urlService}/GetUsuario?id=${id}`);
  }

  save(usuario: UsuarioDTO): Observable<any> {
    return this.client.post(`${this.urlService}/SaveUsuario`, usuario);
  }

  validateLogin(user: string, password: string): Observable<UsuarioDTO> {
    return this.client.get(`${this.urlService}/ValidateLogin?user=${user}&password=${password}`);
  }
}