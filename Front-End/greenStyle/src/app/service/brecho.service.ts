import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Brecho } from "../Models/Brecho";

@Injectable({
  providedIn: 'root'
})
export class BrechoService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAll(): Observable<Brecho[]> {
    return this.http.get<Brecho[]>("http://localhost:8080/brecho")
  }

  getById(id: number): Observable<Brecho> {
    return this.http.get<Brecho>(`http://localhost:8080/brecho/${id}`)
  }

  getByNome(nome: string): Observable<Brecho[]> {
    return this.http.get<Brecho[]>(`http://localhost:8080/nomeBrecho/${nome}`)
  }

  post(brecho: Brecho): Observable<Brecho> {
    return this.http.post<Brecho>("http://localhost:8080/brecho", brecho, this.token)
  }

  put(brecho: Brecho): Observable<Brecho> {
    return this.http.put<Brecho>("http://localhost:8080/brecho", brecho, this.token)
  }

  deleteBrecho(id: number) {
    return this.http.delete(`http://localhost:8080/brecho/deletarBrecho/${id}`, this.token)
  }

}
