import { delay } from 'rxjs/operators';
import { BusquedasService } from './../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Medico } from './../../../models/medico.model';
import { MedicoService } from './../../../services/medico.service';
import { ModalImagenService } from './../../../services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];

  public imgSubs: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(500)
      )
      .subscribe( img => { 
        this.cargarMedicos();
      } );

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {

    this.cargando = true;

    this.medicoService.cargarMedicos()
        .subscribe( medicos => {
          this.cargando = false;
          this.medicos = medicos;
        } );

  }

  abrirModal( medico: Medico ) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedasService.buscar('medicos', termino)
      .subscribe(resp => {

        this.medicos = resp as Medico[];

      });

  }

  borrarMedico( medico: Medico ) {

    Swal.fire({
      title: '¿Estas seguro?',
      text: `${medico.nombre} sera eliminado`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicoService.borrarMedico(medico._id)
          .subscribe(resp => {

            this.cargarMedicos();
            Swal.fire(
              'Eliminado',
              `${medico.nombre} ha sido eliminado`,
              'success'
            )
          });
      }
    })

  }

}
