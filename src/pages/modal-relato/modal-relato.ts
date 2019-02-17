import { Component } from '@angular/core';
import { IonicPage, NavParams,AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModuloProvider } from '../../providers/modulo/modulo';
import { IdentificacaoProvider } from '../../providers/identificacao/identificacao';
import { RelatoProvider } from '../../providers/relato/relato';

@IonicPage()
@Component({
  selector: 'page-modal-relato',
  templateUrl: 'modal-relato.html',
  providers: [
    IdentificacaoProvider,
    RelatoProvider
  ]
})
export class ModalRelatoPage {
  horaSistema: string;
  dataSistema: string;
  relato:any;
  reacao:any;
  descricao:string;
  voto:any;
  like:any;
  deslike:any;
  resp:any;

  constructor( 
    public navParams: NavParams, 
    public viewCtrl:ViewController,
    private alertCtrl: AlertController,
    private modulo:ModuloProvider,
    private ident: IdentificacaoProvider,
    private relatoProvider:RelatoProvider) {
      this.relato = this.navParams.get("relato");
      this.like = this.relato.confirmado;
      this.deslike = this.relato.denunciado;
  }

  ionViewDidLoad() {
  }

  fecharModalRelato(){
    this.viewCtrl.dismiss("recarregar");
  }
  votarConfirmando(){
      let alert = this.alertCtrl.create({
        title: 'O que te motivou a confirmar esse relato?',
        inputs: [
          {
            name: 'texto',
            placeholder: 'Digite aqui'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancelar',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Votar',
            handler: data => {
              if (data.texto) {

                let loader = this.modulo.presentLoading();

                if (this.ident.validaCelular()) {
                  loader.dismiss();
                  this.ident.acao = "um dos botões de votação, clique em 'confirmar relato'";
                }else{
                  loader.dismiss();
                  this.reacao = true;
                  this.descricao = data.texto;

                  let dat = new Date();
                  this.dataSistema = ("00" + dat.getDate()).slice(-2)+"/"+("00" + (dat.getMonth()+1)).slice(-2)+"/"+dat.getFullYear();
                  this.horaSistema = ("00" + dat.getHours()).slice(-2)+":"+("00" + dat.getMinutes()).slice(-2);

                  this.votar();
                }
              } else {
                this.modulo.toastTopShort("Informe um motivo.");
                return false;
              }
            }
          }
        ]
      });
      alert.present();
  }
  votarDenunciando(){
    let alert = this.alertCtrl.create({
      title: 'O que te motivou a denunciar esse relato?',
      inputs: [
        {
          name: 'texto',
          placeholder: 'Digite aqui'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Votar',
          handler: data => {
            if (data.texto) {
              
              let loader = this.modulo.presentLoading();
              
              if (this.ident.validaCelular()) {
                loader.dismiss();
                this.ident.acao = "um dos botões de votação, clique em 'denunciar relato'";
              }else{
                loader.dismiss();
                this.reacao = false;
                this.descricao = data.texto;

                let dat = new Date();
                this.dataSistema = ("00" + dat.getDate()).slice(-2)+"/"+("00" + (dat.getMonth()+1)).slice(-2)+"/"+dat.getFullYear();
                this.horaSistema = ("00" + dat.getHours()).slice(-2)+":"+("00" + dat.getMinutes()).slice(-2);

                this.votar();
              }
            } else {
              this.modulo.toastTopShort("Informe um motivo.");
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  votar(){
    this.voto = {
      "usuario" : {
        "id" : localStorage.getItem("idUsuario")
      },
      "data" : this.dataSistema,
      "hora" : this.horaSistema,
      "descricao" : this.descricao,
      "reacao" : this.reacao
    }

    this.relatoProvider.id_relato = this.relato.idRelato;
    this.relatoProvider.dadosVoto = this.voto;

    this.relatoProvider.votar().subscribe(data =>{
      this.resp = data ;
      this.like = this.resp.confirmado;
      this.deslike = this.resp.denunciado;
      this.modulo.toastTopLong(this.resp.mensagem);
    },
      err =>   console.log('Error post Voto', err),
    );

  }

}
