import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ReturnStatement } from '@angular/compiler/src/output/output_ast';

/*
  Generated class for the IdentificacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IdentificacaoProvider {

  constructor(public alertCtrl: AlertController) {
    console.log('Hello IdentificacaoProvider Provider');
  }

  checarStorage() {

    if (localStorage.getItem("phone") == null || localStorage.getItem("phone")== undefined) {
      console.log("checará o storage!");
      this.validarCelular();
    } else {
      console.log("storage já está preenchido!");
      return false;
    }
  }

  validarCelular() {
    var regex: any = /^\(\d{2}\)\d{8,9}$/;
    let prompt = this.alertCtrl.create({
      title: 'Identificação',
      message: "Digite o número do seu celular",
      inputs: [
        {
          name: 'cel',
          placeholder: 'Ex: (99)912345678'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            //console.log('Cancel clicked');
            alert('Cancelado.');
          }
        },
        {
          text: 'Entrar',
          handler: data => {
            if (regex.test(data.cel)) {
                alert('Celular correto');
                localStorage.setItem("phone",data.cel);
                alert("Seu telefone no storage é: "+localStorage.getItem("phone"));
                return true;
            } else {
                alert('O celular digitado não está correto, favor utilizar formato do exemplo.');
                return false;
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
