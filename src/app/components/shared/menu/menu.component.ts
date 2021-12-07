import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if(!this.authService.validateLogged()) {
      this.router.navigateByUrl('/login');
    }
  }

  validarRol(opcionMenu: string): boolean {
    return this.authService.validatePermissions(opcionMenu);
  }

}
