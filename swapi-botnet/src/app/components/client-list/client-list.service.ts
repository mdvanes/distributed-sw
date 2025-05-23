import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface Client {
  id: string;
  brands: string;
  timestamp: number;
}

@Injectable({
  providedIn: "root",
})
export class ClientListService {
  http = inject(HttpClient);

  // getClients() {
  //   return this.http.get<{clients: {id: string}[]}>('/api/v1/get-clients');
  // }

  getClients() {
    return this.http.get<{ clients: Client[] }>("/api/v1/get-clients");
  }
}
