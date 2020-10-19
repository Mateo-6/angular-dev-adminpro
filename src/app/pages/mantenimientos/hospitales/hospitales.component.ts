import { delay } from 'rxjs/operators';
import { HospitalService } from './../../../services/hospital.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Hospital } from './../../../models/hospital.model';
import  Swal  from 'sweetalert2';

import { BusquedasService } from './../../../services/busquedas.service';
import { ModalImagenService } from './../../../services/modal-imagen.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) { }

  ngOnInit(): void {
    
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(500)
    )
    .subscribe( img => { 
      this.cargarHospitales()
    } );

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales() {
    
    this.cargando = true;

    this.hospitalService.cargarHospitales()
        .subscribe(
          hospitales => {
            this.cargando = false;
            this.hospitales = hospitales;
          }
        );

  }

  guardarCambios( hospital: Hospital ) {

    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre )
        .subscribe(
          resp => {
            Swal.fire('Actualizado', hospital.nombre, 'success')
          }
        );

  }

  eliminarHospital( hospital: Hospital ) {

    this.hospitalService.borrarHospital( hospital._id )
        .subscribe(
          resp => {
            Swal.fire('Borrado', hospital.nombre, 'success');
            this.cargarHospitales();
          }
        );

  }

  async abrirSweetAlert() {

    const  { value = '' } = await Swal.fire<string>({
      text: 'Ingresa el nombre del hospital',
      title: 'Crear hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })
    
    if( value.trim().length > 0 ) {
      this.hospitalService.crearHospital( value )
          .subscribe(
            (resp: any) => {
              this.hospitales.push( resp.hospital )
            }
          )
    }

  }

  abrirModal(hospital: Hospital) {

    this.modalImagenService.abrirModal( 'hospitales', hospital._id, hospital.img );

  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.cargarHospitales();
    }

    this.busquedasService.buscar('hospitales', termino)
      .subscribe(resp => {

        this.hospitales = resp as Hospital[];

      });

  }

}
