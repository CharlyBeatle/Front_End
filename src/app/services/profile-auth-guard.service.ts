import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class RoleAuthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const expectedRole: string[] = route.data.permisos;
    for (const i in expectedRole) {
      const profile = sessionStorage.getItem('rol');
      if (profile !== null) {
        if (profile === expectedRole[i]) {
          return true;
        }
      }
    }
    Swal.fire({text:'No tiene permisos sobre esta opción de menu',
                icon:'info',
                timer: 1000,
              showConfirmButton: false});
    this.router.navigate(['home']);
    return false;
  }
}