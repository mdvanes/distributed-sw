import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ClientListService {
  http = inject(HttpClient);

  getClients() {
    return this.http.get<{clients: {id: string}[]}>('/api/v1/get-clients');
  }
}