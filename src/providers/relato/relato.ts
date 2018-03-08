import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RelatoProvider {
  relato = [];
  id_categoria: string;

  constructor(public http: HttpClient) {
  }

  EnviarRelato(){
    return this.http.post(
      'https://api-relatai.herokuapp.com/categorias/'+this.id_categoria+'/relatos',
      this.relato,{headers: {'Content-Type': 'application/json'}
    });
  }
  
}
