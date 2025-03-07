import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'swapi-botnet-home',

  imports: [AnalogWelcomeComponent],
  template: ` <swapi-botnet-analog-welcome /> `,
})
export default class HomeComponent {}
