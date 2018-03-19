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
  obterMeusRelatos(){
    return this.http.get('https://api-relatai.herokuapp.com/relatos/'+localStorage.getItem("idUsuario")+'/usuarios',
    {headers: {'Content-Type': 'application/json'}
    });
  }
  deletarRelato(idRelato){
    return this.http.delete('https://api-relatai.herokuapp.com/relatos/'+idRelato+'/selecionados'
    );
  }
}
