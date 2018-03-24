import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  HtmlInfoWindow
} from '@ionic-native/google-maps';

import { AlertController } from 'ionic-angular';
import { DadosMapaProvider } from '../../providers/dados-mapa/dados-mapa';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ModuloProvider } from '../../providers/modulo/modulo';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ModalRelatoPage } from '../modal-relato/modal-relato';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
  providers: [
    DadosMapaProvider
  ]
})
export class MapaPage {

  tabBarElement: any;
  splash = true;

  testCheckboxResult: any;
  testCheckboxOpen: boolean;
  map: GoogleMap;
  private latitude: number;
  private longitude: number;

  //dados para o relato modal
  idRelato:any;
  categoria:any;
  


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps,
    public alertCtrl: AlertController,
    private dadosMapa: DadosMapaProvider,
    private modulo:ModuloProvider,
    public modalCtrl:ModalController,
    public geolocation: Geolocation) {
    
      this.tabBarElement = document.querySelector('.tabbar');
      
      this.tabBarElement.style.display = 'none';
      setTimeout(() => {
        this.splash = false;
        this.tabBarElement.style.display = 'flex';
      }, 4000);
  }

  //Ao entrar no mapa, faz um get na API obtendo todas as categorias e markers para
  // dar a primeira carga no mapa
  ionViewDidEnter() {
    
    this.posicaoAtual();

    let loader = this.modulo.presentLoading();
    this.dadosMapa.obterDadosMapaPorCategoria("").subscribe(
      data => {
        loader.dismiss();
        this.modulo.setCategorias(data);
        this.modulo.setMarkers(data);
        
        if(this.map != undefined){
          this.map.destroy();
        }

        this.loadMap();
      }, error => {
        loader.dismiss();
        console.log(error);
      }
    );
  }

  //primeira instância do mapa criada e populada ao abrir o app
  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.latitude,
          lng: this.longitude
        },
        zoom: 14,
        tilt: 0
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);
    var GOOGLE = {"lat": this.latitude, "lng": this.longitude};

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {

       
            // Add circle
            this.map.addCircle({
              'center': GOOGLE,
              'radius': 300,
              'strokeColor': '#fff0e6',
              'strokeOpacity': 0.008,
              'strokeWeight': 0.008,
              'fillColor': '#fff0e6',
              'fillOpacity': 0.008
            });
        

        console.log('Map is ready!');
        for(let x in this.modulo.getMarkers()){
          this.idRelato = this.modulo.getMarkers()[x].id;
          this.categoria = this.modulo.getMarkers()[x].nome;

          for (let i of this.modulo.getMarkers()[x].relatos) {

            let idRel:any = this.idRelato;
            let nomeCategoria:any = this.categoria;
            let dt:any = i.dataPublicacao;
            let hr:any = i.horaPublicacao;
            let desc:any = i.descricao;
            let fot:any = i.foto;
            let confirma:any = i.confirmado;
            let denuncia:any = i.denunciado;
                      
            let htmlInfoWindow = new HtmlInfoWindow();
            let frame: HTMLElement = document.createElement('div');
            frame.innerHTML = [
              '<div style="width:100%;height:120px;max-width:190px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><h5 style="color:#057091;">'+nomeCategoria+'</h5>'+i.descricao+'<div/><p><div align="center" style="background:#057091;float:left;padding:1px;text-align:center;color:white;width:70%;line-height:25px;border-radius:10px;" >Saiba mais</div></p>'
            ].join("");
            frame.getElementsByTagName("div")[0].addEventListener("click", () => {
              htmlInfoWindow.close();
              let param = {idRelato:idRel, categoria:nomeCategoria, data:dt,hora:hr,descricao:desc,foto:fot,confirmado:confirma,denunciado:denuncia};
              this.abrirModalRelato(param);
            });
            htmlInfoWindow.setContent(frame, {width: "200px", height: "130px", margin:"none", border:"none",padding:"none"});
            let icone:any;
            
            if(this.categoria == "Segurança"){
              icone = "orange";
            }else if(this.categoria == "Educação"){
              icone = "blue";
            }else if(this.categoria == "Saneamento básico"){
              icone = "DarkCyan";
            }else if(this.categoria == "Saúde"){
              icone = "green";
            }else{
              icone = "red";
            }

            this.map.addMarker({
              icon: icone,
              animation: 'BOUNCE',
              position: {
                lat: i.latitude,
                lng: i.longitude
              }
  
            })
              .then(marker => {
                marker.on(GoogleMapsEvent.MARKER_CLICK)
                  .subscribe(() => {
                    htmlInfoWindow.open(marker);
                  });
              });
          }
        }
        //this.map.moveCamera(this.map.getCameraPosition())
    });
  }

  //Filtro por categoria, pega as escolhas do usuário e faz um get na API trazendo somente relatos desejados,
  // caso nao selecione nenhum traz todos os relatos
  showCheckbox() {
    let alrt = this.alertCtrl.create();
    alrt.setTitle('Escolha uma ou mais categorias para que apareçam no mapa.');

    for (let i of this.modulo.getCategorias()) {
      alrt.addInput({
        type: 'checkbox',
        label: i.nome,
        value: i.id,
      });
    }
    alrt.addButton('Cancelar');
    alrt.addButton({
      text: 'Confirmar',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data.join(",");

        let loader = this.modulo.presentLoading();
        this.dadosMapa.obterDadosMapaPorCategoria(this.testCheckboxResult).subscribe(
          data => {
            loader.dismiss();
            this.modulo.setMarkers(data);
            this.map.destroy();
            this.loadMap();
          }, error => {
            loader.dismiss();
            console.log(error);
          }
        );

      }
    });
    alrt.present();
  }

  abrirModalRelato(parametros){
    this.modalCtrl.create(ModalRelatoPage,{relato:parametros}).present();
  }

  posicaoAtual() {
    
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
