import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Text } from '@angular/compiler';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IdentificacaoProvider } from '../../providers/identificacao/identificacao';


/**
 * Generated class for the RelatarProblemaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relatar-problema',
  templateUrl: 'relatar-problema.html',
  providers:[
    IdentificacaoProvider
  ]
})
export class RelatarProblemaPage {
  public categoria:any;

  base64Image:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private ident: IdentificacaoProvider ) {
  }

  abreCamera(){

    let config: CameraOptions = {
      quality: 100,
      cameraDirection:1,
      saveToPhotoAlbum:true,
      correctOrientation:false,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(config).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }

  relatar(){
    
    //console.log(this.ident.checarStorage());
    
    if (this.ident.checarStorage() == undefined){
      return false;
    }else{
      alert("gravando o relato ...");
    } 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RelatarProblemaPage');
  }

}
