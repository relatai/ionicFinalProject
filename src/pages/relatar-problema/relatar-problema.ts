import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IdentificacaoProvider } from '../../providers/identificacao/identificacao';
import { Geolocation } from '@ionic-native/geolocation';
import { DadosMapaProvider } from '../../providers/dados-mapa/dados-mapa';
import { AlertController } from 'ionic-angular';
import { ModuloProvider } from '../../providers/modulo/modulo';


@IonicPage()
@Component({
  selector: 'page-relatar-problema',
  templateUrl: 'relatar-problema.html',
  providers: [
    IdentificacaoProvider,
    DadosMapaProvider
  ]
})
export class RelatarProblemaPage {
  private imgFoto: any = "assets/imgs/foto1.png";
  private latlgt: any;
  private dados: any;
  private categoria: any;
  private descricao: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private ident: IdentificacaoProvider,
    private geolocation: Geolocation,
    private dadosMapa: DadosMapaProvider,
    private modulo:ModuloProvider) {
  }

  posicaoAtual() {
    
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latlgt = [resp.coords.latitude, resp.coords.longitude];
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  abreCamera() {
    
    let loader = this.modulo.presentLoading();
    
    let config: CameraOptions = {
      quality: 100,
      cameraDirection: 1,
      saveToPhotoAlbum: true,
      correctOrientation: false,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(config).then((imageData) => {
      loader.dismiss();
      this.imgFoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      loader.dismiss();
      console.log(err);
    });
  }

  checaIdentificacao() {
    
    let loader = this.modulo.presentLoading();
    
    if (this.ident.validaCelular()) {
      loader.dismiss();
      this.ident.acao = "Relatai";
    } else {
      loader.dismiss();
      this.validar();
    }
  }

  validar() {
    if(this.latlgt == undefined){
      this.modulo.toastTopLong("Não estou encontrando sua localização. Verifique se seu celular está com o GPS ligado, depois tente novamente.");
      return false;
    }else if (this.categoria == undefined) {
      this.modulo.toastButtomShort("Escolha uma categoria.");
      return false;
    } else if (this.descricao == undefined) {
      this.modulo.toastTopShort("Não entendi! descreva o problema por favor.");
      return false;
    } else if (this.imgFoto == "assets/imgs/foto1.png") {
      this.modulo.toastTopShort("A foto é essencial no relato.");
      return false;  
    }else{
      this.relatar();
    }

  }

  relatar(){
    this.modulo.toastTopShort("Registrando o relato...");
  }

  ionViewDidEnter() {
    this.posicaoAtual();
    
    let loader = this.modulo.presentLoading();
    
    this.dadosMapa.obterDadosMapa().subscribe(
      data => {
        loader.dismiss();
        this.dados = data;
        console.log(this.dados);
      }, error => {
        loader.dismiss();
        console.log(error);
      }
    );

  }
  /*
  confirmarFoto() {
    let alert = this.alertCtrl.create({
      title: 'Registro de imagem',
      message: 'Com uma foto ficaria melhor, gostaria de tirar uma?',
      buttons: [
        {
          text: 'Não',
          role: 'não',
          handler: () => {
            this.relatar();
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.abreCamera();
          }
        }
      ]
    });
    alert.present();
  }*/

}
