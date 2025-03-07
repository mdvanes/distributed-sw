import { Component } from "@angular/core";
// import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: "swapi-botnet-home",

  imports: [],
  template: `
    <div>
      <h1>Dashboard</h1>
    </div>
  `,
  styles: [
    `
      div {
        color: #ffbf00;
        padding: 3rem;
        font-family: Arial, sans-serif;
        font-size: 2rem;
      }
    `,
  ],
})
export default class DashboardComponent {}
