import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Carta } from '../models/carta.model';
@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor(private http: HttpClient) { }

  getAllCards(): Observable<Carta[]> {
    return this.http.get<Carta[]>(`${environment.baseUrl}/cartas`)
  }

  getCardById(id: number): Observable<Carta>{
    return this.http.get<Carta>(`${environment.baseUrl}/cartas/${id}`)
  }

  insertCards(carta: Carta) {
    return this.http.post<Carta>(`${environment.baseUrl}/cartas`,carta).pipe(map(data =>{
      localStorage.setItem('id',data.id.toString())
      localStorage.setItem('nome',data.nome)
      localStorage.setItem('desc',data.descricao)
      localStorage.setItem('ataque',data.ataque.toString())
      localStorage.setItem('defesa',data.defesa.toString())
      localStorage.setItem('tipo',data.tipo)
      localStorage.setItem('classe',data.classe)
    }))
  }

  updateCard(id: number, carta: Carta){
    return this.http.put(`${environment.baseUrl}/cartas/${id}`,carta)
  }

  deleteCard(id: number){
    return this.http.delete(`${environment.baseUrl}/cartas/${id}`).pipe(map(data=>{
      localStorage.clear()
    }))
  }
}
