import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../Models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getAllProdutos(): Observable<Produto[]>{
    return this.httpClient.get<Produto[]>('http://localhost:8080/produto')
  }

  getByIdProdutos(id: number): Observable<Produto>{
    return this.httpClient.get<Produto>(`http://localhost:8080/produto/${id}`)
  }

  getByIdBrechoProdutos(id: number): Observable<Produto[]>{
    return this.httpClient.get<Produto[]>(`http://localhost:8080/produto/brecho/${id}`)
  }
}
