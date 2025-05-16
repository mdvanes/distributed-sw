import { Component, OnDestroy, OnInit } from "@angular/core";
// import { MatSliderModule } from '@angular/material/slider';
// import { MatChipsModule } from '@angular/material/chips';
import { ClientListService } from "./client-list.service";
// import { Modes } from './homesec.types';
import { Subscription } from "rxjs";
import { WebSocketService } from "./client2.service";

@Component({
  selector: "client-list",
  standalone: true,
  //   imports: [MatSliderModule, MatChipsModule],
  imports: [],
  styles: [``],
  template: `<h2>Client List</h2>
    @for (client of clients; track client) {
    <div>{{ client.id }}</div>
    }

    @for (message of messages; track message) {
    <div>{{ message }}</div>
    }

    <!-- <div *ngFor="let message of messages">
        {{ message }}
      </div> --> `,
})
export class ClientListComponent implements OnInit, OnDestroy {
  clients: { id: string }[] = [];
  messages: any[] = [];
  private messageSubscription: Subscription | null = null;

  constructor(
    private clientListService: ClientListService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    // this.clientListService.getClients().subscribe((data) => {
    //   this.clients = data.clients;
    // });

    // this.messageSubscription = 
    this.webSocketService
      .getMessages()
      .subscribe((message) => {
        this.messages.push(message);
      });
  }

  ngOnDestroy() {
    // Unsubscribe from WebSocket messages and close the connection
    // this.messageSubscription?.unsubscribe();
    // this.webSocketService.closeConnection();
  }
}
