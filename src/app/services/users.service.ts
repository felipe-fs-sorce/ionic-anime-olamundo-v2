import { Injectable } from '@angular/core';

// Requisições assíncronas
import { Observable } from 'rxjs';

// Cliente HTTP do Angular
import { HttpClient } from '@angular/common/http';

// Modelagem dos dados
import { ResponseUsers, ResponseDelUser, ResponsePostUser, ResponsePutUser, ResponseUser } from '../models/users.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // URL da API
  private apiUrl = 'http://localhost:8888/api';

  // Inicializa o cliente HTTP
  constructor(private http: HttpClient) { }

  // Método para obter todos os usuários
  getUsers(): Observable<ResponseUsers> {

    // FAZ o GET em todos os registro da API
    return this.http.get<ResponseUsers>(this.apiUrl);
  }

  // Método para obter um uusário único
  getUser(id: string): Observable<ResponseUser> {

    // Formata a URL para obter usuário único pelo Id
    const url = `${this.apiUrl}?id=${id}`;

    // Faz o GET  de um usuario na API
    return this.http.get<ResponseUser>(url);
  }

  // Método para apagar um uusário único
  deleteUser(id: string): Observable<ResponseDelUser> {

    // Formata a URL para apagar usuário único pelo Id
    const url = `${this.apiUrl}?id=${id}`;

    // Faz o delete na api
    return this.http.delete<ResponseDelUser>(url);
  }

  // Método para salvar um novo usuário
  postUser(data: any) {

    // Faz o post na api
    return this.http.post<ResponsePostUser>(this.apiUrl, data);
  }

   // Método para atualizar o usuário
   updateUser(data: any) {

    // Faz o post na api
    return this.http.post<ResponsePutUser>(this.apiUrl, data);
  }
}
