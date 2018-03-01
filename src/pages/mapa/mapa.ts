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

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
  providers:[
    DadosMapaProvider
  ]
})
export class MapaPage {

  tabBarElement: any;
  splash = true;

  testCheckboxResult: any;
  testCheckboxOpen: boolean;
  map: GoogleMap;
  dados:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, public alertCtrl: AlertController, private dadosMapa:DadosMapaProvider) {
    this.tabBarElement = document.querySelector('.tabbar');
  }

  ionViewDidEnter(){
    this.dadosMapa.obterDadosMapa().subscribe(
      data=>{
        this.dados = data;
        console.log(this.dados);
      }, error => {
        console.log(error);
      }
    );
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      this.tabBarElement.style.display = 'flex';
    }, 4000);

    this.loadMap();
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: -23.504189,
          lng: -46.604844
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Saneamento básico',
          icon: 'red',
          animation: 'DROP',
          position: {
            lat: -23.505242,
            lng: -46.604388
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                //this.ident.validaCelular();
                
              });
          });


        //this.map.moveCamera(this.map.getCameraPosition())

      });

  }

  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Escolha uma ou mais categorias para que apareçam no mapa.');

    for (let i of this.dados) {
      alert.addInput({
        type: 'checkbox',
        label: i.nome,
        value: i.id,
      });
    }

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Confirmar',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
  }



}
