import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGiftsResponse, Gif } from '../interfaces/gifts.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

    private apiKey: string = 'ANEHSwSXXj3C9cZn5VT5LYTR9SvMH9DU'
    private _historial: string[] = [];
    //TODO: Cambiar any por su tipo
    public resultados: Gif[] = [];

    get historial() {
      return [...this._historial];
    }

    constructor( private http: HttpClient ) {

      this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
      // Otra forma de resolvero:
      // if (localStorage.getItem('historial')) {
      //   this._historial = JSON.parse( localStorage.getItem('historial')! )
      // }

    }

    buscarGifs( query: string ) {
      
      query =  query.trim().toLocaleLowerCase();

      if (!this._historial.includes( query )) {
        this._historial.unshift( query ); 
        this._historial = this._historial.splice(0,10);

        localStorage.setItem('historial', JSON.stringify( this._historial ));

      }

      this.http.get<SearchGiftsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=ANEHSwSXXj3C9cZn5VT5LYTR9SvMH9DU&q=${ query }&limit=10`)
      .subscribe( ( resp ) => {
        this.resultados = resp.data;
        
      })  
      
    }


  
}
