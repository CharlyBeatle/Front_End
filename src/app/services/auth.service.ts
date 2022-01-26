import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor() { }
    
    validateLogged(): boolean  {
        const login = sessionStorage.getItem('username');
        if (login === null) {
          return false;
        }
        return true;
    }

    validatePermissions(opcionMenu: string): boolean {
        return true;
    }
}