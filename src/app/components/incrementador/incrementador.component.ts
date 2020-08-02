import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit(): void {
    this.btn_class =  `btn ${this.btn_class}`;
  }

  @Input('valor_input') progreso: number = 10;
  @Input() btn_class: string = 'btn-primary';
  /* @Input() progreso: number = 10; */
  @Output('valor_output') valorSalida: EventEmitter<number> = new EventEmitter();

  get getPorcentaje() {
    return `${this.progreso}%`;
  }

  cambiarValor(valor: number) {

    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);

  }

  onChange( nuevoValor: number ) {

    if(nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    this.valorSalida.emit(this.progreso);

  }

}
