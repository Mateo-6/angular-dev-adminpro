import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;

  constructor(public sidebarService: SidebarService,
              private usuarioService: UsuarioService) {

    this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {
  }

}
