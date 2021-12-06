import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string;
  password: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  validateLogin() {
    sessionStorage.setItem('user', this.usuario);
    this.router.navigate(['home']);
  }

}
