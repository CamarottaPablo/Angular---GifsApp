import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGiftsResponse, Gif } from '../interfaces/gifts.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

    private apiKey: string = 'ANEHSwSXXj3C9cZn5VT5LYTR9SvMH9DU';
    private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
    private _historial: string[] = [];
    //TODO: Cambiar any por su tipo
    public resultados: Gif[] = [];

    get historial() {
      return [...this._historial];
    }

    constructor( private http: HttpClient ) {

      this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
      this.resultados = JSON.parse( localStorage.getItem('resultado')! ) || [];
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

      const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limite', '10')
            .set('q', query);
      this.http.get<SearchGiftsResponse>(`${ this.servicioUrl }/search`, { params } )
      .subscribe( ( resp ) => {
        this.resultados = resp.data;
        localStorage.setItem('resultado', JSON.stringify( this.resultados ));
      })  
      
    }


  
}
