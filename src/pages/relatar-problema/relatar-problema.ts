import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IdentificacaoProvider } from '../../providers/identificacao/identificacao';
import { Geolocation } from '@ionic-native/geolocation';
import { DadosMapaProvider } from '../../providers/dados-mapa/dados-mapa';

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
  base64Image: string;
  private latlgt:any;
  dados:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private ident: IdentificacaoProvider,private geolocation: Geolocation, private dadosMapa:DadosMapaProvider) {
  }

  posicaoAtual(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latlgt = [resp.coords.latitude,resp.coords.longitude];
      alert(this.latlgt);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  abreCamera() {
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
      this.imgFoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  checaIdentificacao() {
    if (this.ident.validaCelular()) {
      this.ident.acao = "Relatai";
    } else {
      this.relatar();
    }
  }
  relatar() {
    alert("gravando o relato ...");
  }

  ionViewDidEnter() {
    this.posicaoAtual();

    this.dadosMapa.obterDadosMapa().subscribe(
      data=>{
        this.dados = data;
        console.log(this.dados);
      }, error => {
        console.log(error);
      }
    );

  }

}
