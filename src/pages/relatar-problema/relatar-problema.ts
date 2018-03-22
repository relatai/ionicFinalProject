import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IdentificacaoProvider } from '../../providers/identificacao/identificacao';
import { Geolocation } from '@ionic-native/geolocation';
import { ModuloProvider } from '../../providers/modulo/modulo';
import { RelatoProvider } from '../../providers/relato/relato';


@IonicPage()
@Component({
  selector: 'page-relatar-problema',
  templateUrl: 'relatar-problema.html',
  providers: [
    IdentificacaoProvider,
    RelatoProvider
  ]
})
export class RelatarProblemaPage {
  private imgFoto: string = "assets/imgs/foto1.png";
  private latitude: number;
  private longitude: number;
  private dados: any;
  private categoria: any;
  private descricao: any;
  private dataSistema:string;
  private horaSistema:string;
  private relato:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private ident: IdentificacaoProvider,
    private geolocation: Geolocation,
    private modulo:ModuloProvider,
    private relatoProvider:RelatoProvider) {
  }
  
  posicaoAtual() {
    
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  abreCamera() {
    
    let loader = this.modulo.presentLoading();
    
    let config: CameraOptions = {
      quality: 70,
      cameraDirection: 1,
      saveToPhotoAlbum: false,
      correctOrientation: true,
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

      let dat = new Date();
      this.dataSistema = ("00" + dat.getDate()).slice(-2)+"/"+("00" + (dat.getMonth()+1)).slice(-2)+"/"+dat.getFullYear();
      this.horaSistema = ("00" + dat.getHours()).slice(-2)+":"+("00" + dat.getMinutes()).slice(-2);

      this.validar();
    }
  }

  validar() {
    if(this.dataSistema == "" || this.dataSistema == undefined || this.horaSistema == "" || this.horaSistema == undefined){
      this.modulo.toastTopLong("Encontramos problemas ao obter a data ou a hora do seu aparelho.");
      return false;
    }
    if(this.latitude == undefined || this.longitude == undefined){
      this.modulo.toastTopLong("Não estou encontrando sua localização. Verifique se seu celular está com o GPS ligado, depois tente novamente.");
      return false;
    }else if (this.categoria == undefined || this.categoria == "Escolha uma categoria") {
      this.modulo.toastButtomShort("Escolha uma categoria.");
      return false;
    } else if (this.descricao == undefined || this.descricao == "") {
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

      this.relato ={
        "usuario":[{
          "id": localStorage.getItem("idUsuario") 
        }],
        "dataPublicacao": this.dataSistema,
        "horaPublicacao": this.horaSistema,
        "descricao": this.descricao,
        "latitude": this.latitude,
        "longitude": this.longitude,
        "foto": this.imgFoto
      }
    
    this.relatoProvider.id_categoria = this.categoria;
    this.relatoProvider.relato = this.relato;
    
    
    this.relatoProvider.EnviarRelato().subscribe(data =>{
      console.log("Relato enviado com sucesso!");
    },
      err =>  console.log(err),
    );
    
    this.imgFoto = "assets/imgs/foto1.png";
    this.categoria = "Escolha uma categoria";
    this.descricao = "";
    this.modulo.toastMiddleLong("Pronto! o Relato foi criado, vá até o mapa e confira!");
    //this.navCtrl.parent.select(0);
}
ionViewDidLeave(){
  
}

  ionViewDidEnter() {
    this.posicaoAtual();
    this.dados = this.modulo.getCategorias();
  }
}
