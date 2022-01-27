import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clickMenu: boolean;
  nombre: string;
  
  constructor(private router: Router) {
  }

  validateLogged(): boolean  {
    const login = sessionStorage.getItem('user');
    if (login === null) {
      return false;
    }
    this.nombre = login;
    return true;
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
