import { Component } from "@angular/core";
// import { AnalogWelcomeComponent } from './analog-welcome.component';
import { ClientListComponent } from "../../components/client-list/client-list.component";

@Component({
  selector: "swapi-botnet-home",

  imports: [ClientListComponent],
  template: `
    <div>
      <h1>Dashboard</h1>
      <client-list />
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
export default class DashboardComponent {
  constructor() {
    // const run = async () => {
    //   // TODO this needs an angular service. See homesec.service.ts. Via client-list.service.ts
    //   const response = await fetch("/api/v1/get-clients");
    //   console.log("response", response);
    //   const data = await response.json();
    //   console.log("data", data);
    //   // eval(data.workload);
    // };
    // run();
  }
}
