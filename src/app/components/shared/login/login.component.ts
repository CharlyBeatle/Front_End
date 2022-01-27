import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/services/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string;
  password: string;
  constructor(private router: Router,
              private service: UsuarioService) { }

  ngOnInit(): void {
  }

  validateLogin() {
    this.service.validateLogin(this.usuario, this.password).subscribe({
      next: (result: UsuarioDTO) => {
        if(result !== null) {
          sessionStorage.setItem('user', this.usuario);
          sessionStorage.setItem('username', result.idUsuario);
          sessionStorage.setItem('rol', result.tipo);
          this.router.navigate(['home']);
        } else {
          Swal.fire({text: 'Usuario o Contraseña incorrecta',
                      icon: 'warning',
                     showConfirmButton: false,
                     timer: 1000})
        }
        console.log(result);
      },
      error: (err) => {
        Swal.fire({text: 'Ocurrio un error validando la información. Intentelo nuevamente',
                      icon: 'error',
                     showConfirmButton: false,
                     timer: 1000})
        console.log(err);
      }
    });
    
  }

}
