import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;



  constructor() {

    /* this.retonaObservable()
    .pipe(
      retry()
    ).subscribe(
      valor => console.log('subs: ', valor),
      (err) => console.warn('Error:', err),
      () => console.info('Obs terminado')
    ); */

    this.intervalSubs = this.retornaIntervalo()
      .subscribe(console.log);

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {

    return interval(500)
      .pipe(
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0) ? true : false),
        take(10)
      );

  }

  retonaObservable(): Observable<number> {

    let i = -1;

    return new Observable<number>(observer => {

      const intervalo = setInterval(() => {

        i++;
        observer.next(i);

        if (i === 6) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('I es 2');
        }

      }, 1000);

    });

  }

}
