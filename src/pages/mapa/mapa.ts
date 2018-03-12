import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';

import { AlertController } from 'ionic-angular';
import { DadosMapaProvider } from '../../providers/dados-mapa/dados-mapa';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ModuloProvider } from '../../providers/modulo/modulo';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps,
    public alertCtrl: AlertController,
    private dadosMapa: DadosMapaProvider,
    private loadingCtrl: LoadingController,
    private modulo:ModuloProvider) {
    
      this.tabBarElement = document.querySelector('.tabbar');
      
      this.tabBarElement.style.display = 'none';
      setTimeout(() => {
        this.splash = false;
        this.tabBarElement.style.display = 'flex';
      }, 4000);
  }

  ionViewDidEnter() {
    
  }

  //Ao dar o load inicial, faz um get na API obtendo todas as categorias e markers para
  // dar a primeira carga no mapa
  ionViewDidLoad() {
    let loader = this.modulo.presentLoading();
    this.dadosMapa.obterDadosMapaPorCategoria("").subscribe(
      data => {
        loader.dismiss();
        this.modulo.setCategorias(data);
        this.modulo.setMarkers(data);
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
          lat: -14.383656,
          lng: -51.345143
        },
        zoom: 4,
        tilt: 10
      }
    };
    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        for(let x in this.modulo.getMarkers()){
          for (let i of this.modulo.getMarkers()[x].relatos) {
            this.map.addMarker({
              title: i.descricao,
              icon: 'red',
              animation: 'DROP',
              position: {
                lat: i.latitude,
                lng: i.longitude
              }
  
            })
              .then(marker => {
                marker.on(GoogleMapsEvent.MARKER_CLICK)
                  .subscribe(() => {
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

}
