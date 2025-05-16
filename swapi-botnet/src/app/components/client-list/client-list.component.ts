import { Component, OnDestroy, OnInit } from "@angular/core";
// import { MatSliderModule } from '@angular/material/slider';
// import { MatChipsModule } from '@angular/material/chips';
import { Client, ClientListService } from "./client-list.service";
// import { Modes } from './homesec.types';
import { Subscription, timer, tap, switchMap } from "rxjs";
import { WebSocketService } from "./client2.service";

const POLL_INTERVAL = 15_000;

type NavigatorExtended =
  | {
      userAgentData?: {
        brands?: { brand: string; version: string }[];
      };
    }
  | undefined;

@Component({
  selector: "client-list",
  standalone: true,
  //   imports: [MatSliderModule, MatChipsModule],
  imports: [],
  styles: [``],
  template: `<h2>Client List</h2>
    @for (client of clients; track client) {
    <div>{{ client.id }} {{ client.brands }}</div>
    } @for (message of messages; track message) {
    <div>{{ message }}</div>
    }

    <!-- <div *ngFor="let message of messages">
        {{ message }}
      </div> --> `,
})
export class ClientListComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
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
    // const brands = (navigator as NavigatorExtended)?.userAgentData?.brands
    //   ?.map((brand) => `${brand.brand} ${brand.version}`)
    //   .join(", ");

    this.clientListService.getClients().subscribe((data) => {
      this.clients = data.clients;
    });

    timer(0, POLL_INTERVAL)
      .pipe(
        // tap(() => console.log("tappie")),
        switchMap((_) => this.clientListService.getClients())
      )
      .subscribe((data) => {
        // console.log("data", Date.now(), data);
        this.clients = data.clients;
      });

    // this.webSocketService
    //   .getMessages()
    //   .subscribe((message) => {
    //     this.messages.push(message);
    //   });
  }

  ngOnDestroy() {
    // Unsubscribe from WebSocket messages and close the connection
    // this.webSocketService.closeConnection();
  }
}
