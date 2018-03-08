import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DadosMapaProvider {

  constructor(public http: HttpClient) {
  }

  obterDadosMapa(){
    return this.http.get('https://api-relatai.herokuapp.com/categorias',
    {headers: {'Content-Type': 'application/json'}
    });
  }

}
