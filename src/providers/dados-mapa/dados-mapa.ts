import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DadosMapaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DadosMapaProvider {

  constructor(public http: HttpClient) {
  }

  obterDadosMapa(){
    return this.http.get('https://relatai-api.herokuapp.com/categorias');
  }

}
