import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { IdentificacaoProvider } from '../../providers/identificacao/identificacao';
import { ModuloProvider } from '../../providers/modulo/modulo';
import { RelatoProvider } from '../../providers/relato/relato';

@IonicPage()
@Component({
  selector: 'page-mostrar-meus-relatos',
  templateUrl: 'mostrar-meus-relatos.html',
  providers: [
    IdentificacaoProvider,
    RelatoProvider
  ]
})
export class MostrarMeusRelatosPage {

  meusRelatos: any;

  constructor(
    private ident: IdentificacaoProvider,
    private modulo: ModuloProvider,
    public navCtrl: NavController,
    public relProv: RelatoProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
    if (this.ident.validaCelular()) {
      this.irParaHome();
      this.ident.acao = "Meus Relatos";
    } else {
      this.listarRelatos();
      console.log("carregando seus relatos...");
    }
  }
  irParaHome() {
    this.navCtrl.parent.select(0);
    console.log("entrou na irParaHome");
  }

  listarRelatos() {
    let loader = this.modulo.presentLoading();
    this.relProv.obterMeusRelatos().subscribe(
      data => {
        loader.dismiss();
        this.meusRelatos = data;
      }, error => {
        loader.dismiss();
        console.log(error);
      }
    );
  }
  delete(relato){

      let confirm = this.alertCtrl.create({
        title: 'Quer excluir o relato?',
        message: 'Clicando em sim, seu relato será apagado e não aparecerá mais no mapa',
        buttons: [
          {
            text: 'Não',
            handler: () => {
              console.log('Não clicado');
            }
          },
          {
            text: 'Sim',
            handler: () => {
              console.log('Sim clicado');

              let loader = this.modulo.presentLoading();
              this.relProv.deletarRelato(relato.id).subscribe(
                data => {
                  loader.dismiss();
                  this.modulo.toastTopShort("O Relato foi Excluído!");
                  this.listarRelatos();
                }, error => {
                  loader.dismiss();
                  console.log(error);
                }
              );
            }
          }
        ]
      });
      confirm.present();
  }



}
