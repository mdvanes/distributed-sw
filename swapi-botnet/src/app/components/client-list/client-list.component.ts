import { Component, OnInit } from "@angular/core";
// import { MatSliderModule } from '@angular/material/slider';
// import { MatChipsModule } from '@angular/material/chips';
import { ClientListService } from "./client-list.service";
// import { Modes } from './homesec.types';

@Component({
  selector: "client-list",
  standalone: true,
  //   imports: [MatSliderModule, MatChipsModule],
  imports: [],
  styles: [``],
  template: `<h2>Client List</h2>
    @for (client of clients; track client) {
    <div>{{ client.id }}</div>
    } `,
})
export class ClientListComponent implements OnInit {
  clients: { id: string }[] = [];

  constructor(private clientListService: ClientListService) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientListService.getClients().subscribe((data) => {
      this.clients = data.clients;
    });
  }
}
