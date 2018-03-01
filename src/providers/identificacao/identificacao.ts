import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Injectable()
export class IdentificacaoProvider {
  private idUsuario:any;
  private phone:string;
  public acao:string;

  constructor(public http: HttpClient, public alertCtrl: AlertController, private toastCtrl: ToastController) {
  }

  validaCelular() {
    if(localStorage.getItem("idUsuario")==undefined || localStorage.getItem("idUsuario")==null){
      var regex: any = /^\(\d{2}\)\d{8,9}$/;
      let prompt = this.alertCtrl.create({
        title: 'Novo por aqui?',
        message: "Digite o número do seu celular",
        inputs: [
          {
            name: 'cel',
            placeholder: 'Ex: (99)11110000'
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              console.log('Cancelado..');
            }
          },
          {
            text: 'Entrar',
            handler: data => {
              if (regex.test(data.cel)) {

                this.phone = data.cel;
                this.obterId(this.phone).subscribe(data =>{
                  this.idUsuario = data;
                  
                localStorage.setItem("idUsuario",this.idUsuario.id);
                this.toastIdentificacao('Pronto! Agora é só clicar novamente em '+this.acao);
                },
                  err => console.log("error is "+err),
                );

              } else {
                this.toastIdentificacao('Acho que você digitou errado, tente novamente. Esse Exemplo pode te ajudar (99)911110000');
                return false;
              }
            }
          }
        ]
      });
      prompt.present();
      return true;
    }else{
      return false;
    }
  }

  obterId(telefone:any){
    return  this.http.get("https://relatai-api.herokuapp.com/usuarios/" + telefone);
  }

  toastIdentificacao(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 7000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Fechou o toast');
    });
    toast.present();
  }
}
