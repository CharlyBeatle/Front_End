import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

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
      console.log(profile);
      console.log(expectedRole[i]);
        if (profile !== null) {
        if (profile === expectedRole[i]) {
          return true;
        }
      }
    }
    this.router.navigate(['home']);
    return false;
  }
}