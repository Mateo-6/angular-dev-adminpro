import { Component, Input} from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() title: string = 'Sin titulo';

  @Input('labels') public doughnutChartLabels: Label[] = ['Pan', 'Mateo', 'Laura'];
  @Input('data') public doughnutChartData: MultiDataSet = [
    [10, 50, 50]
  ];

  public doughnutChartType: ChartType = 'doughnut';

  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02069'] }
  ];

}
