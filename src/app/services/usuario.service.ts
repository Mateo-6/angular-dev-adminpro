import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';

import { RegisterForm } from './../interface/register-form.interface';
import { CargarUsuario } from './../interface/cargar-usuarios.interface';
import { LoginForm } from './../interface/login-form.interface';

import { EmailValidator } from '@angular/forms';
import { Usuario } from './../models/usuario.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {

    this.googleInit();

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid() {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {

        const {
          email,
          google,
          nombre,
          role,
          img = '',
          uid
        } = resp.usuario;

        this.usuario = new Usuario(
          nombre,
          email,
          '',
          img,
          google,
          role,
          uid
        );

        localStorage.setItem('token', resp.token);

        return true;

      }),
      catchError(error => of(false))
    );

  }

  crearUsuario(formData: RegisterForm) {

    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );

  }

  actualizarPerfil( data: { email: string, nombre: string, role: string } ) {

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${ this.uid }`, data, this.headers);

  }

  login(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );

  }

  loginGoole(token) {

    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );

  }

  logout() {

    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });

  }

  googleInit() {

    return new Promise( resolve => {
      gapi.load('auth2', () => {
       
        this.auth2 = gapi.auth2.init({
          client_id: '235759217056-o9dnospreoc1ipgg0ilbhjodsfp2g0a3.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',

        });

        resolve();

      });

    });

  }

  cargarUsuarios( desde: number = 0 ) {

    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get< CargarUsuario >( url, this.headers )
                .pipe(
                  map( resp => {
                    const usuarios = resp.usuarios.map( 
                      user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid ) 
                    );
                    return {
                      total: resp.total,
                      usuarios
                    };
                  })
                );

  }

  eliminarUsuario( usuario: Usuario ) {

    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers );

  }

  guardarUsuario( usuario: Usuario) {

    /* data = {
      ...data,
      role: this.usuario.role
    } */

    return this.http.put(`${base_url}/usuarios/${ usuario.uid }`, usuario, this.headers);

  }

}
