import { tap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
              private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

      return this.usuarioService.validarToken()
        .pipe(
          tap(estaAutenticado => {

            if (!estaAutenticado) {
              this.router.navigateByUrl('/login');
            }

          })
        );

    }

}
