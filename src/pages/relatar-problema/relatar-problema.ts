import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IdentificacaoProvider } from '../../providers/identificacao/identificacao';

@IonicPage()
@Component({
  selector: 'page-relatar-problema',
  templateUrl: 'relatar-problema.html',
  providers: [
    IdentificacaoProvider
  ]
})
export class RelatarProblemaPage {
  private imgFoto: any = "assets/imgs/foto1.png";
  base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private ident: IdentificacaoProvider) {
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

  ionViewDidLoad() {

  }

}
