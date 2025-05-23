import { Component } from "@angular/core";
// import { AnalogWelcomeComponent } from './analog-welcome.component';
import { ClientListComponent } from "../../components/client-list/client-list.component";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { ClientListService } from "../../components/client-list/client-list.service";

@Component({
  selector: "swapi-botnet-home",
  imports: [
    FormsModule,
    ClientListComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
  ],
  template: `
    <div>
      <h1>Dashboard</h1>
      <mat-card appearance="outlined">
        <mat-card-content>
          <textarea [(ngModel)]="payload"></textarea>
          <mat-divider></mat-divider>
          <div>
            <button mat-flat-button (click)="onSubmit()">
              <mat-icon>home</mat-icon>
              submit
            </button>
          </div>
        </mat-card-content>
      </mat-card>
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
  payload = "console.log('haxx');";

  constructor(private clientListService: ClientListService) {
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

  onSubmit() {
    // Handle the submit logic here
    console.log("Submitted payload:", this.payload);
    this.clientListService.setWorkload(this.payload).subscribe((data) => {});
  }
}
