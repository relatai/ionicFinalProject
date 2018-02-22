import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

import { AlertController } from 'ionic-angular';
import { RelatarProblemaPage } from '../relatar-problema/relatar-problema';
import { IdentificacaoProvider } from '../../providers/identificacao/identificacao';

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
  providers:[
    IdentificacaoProvider
  ]
})
export class MapaPage {

  tabBarElement: any;
  splash = true;

  testCheckboxResult: any;
  testCheckboxOpen: boolean;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, public alertCtrl: AlertController,private ident:IdentificacaoProvider) {
    this.tabBarElement = document.querySelector('.tabbar');
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
                this.ident.validarCelular();
                
              });
          });


        //this.map.moveCamera(this.map.getCameraPosition())

      });

  }

  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Escolha uma ou mais categorias para que aparessam no mapa.');

    alert.addInput({
      type: 'checkbox',
      label: 'Saneamento Básico',
      value: 'SanBas',
      //checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Saúde',
      value: 'sau'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Educação',
      value: 'edu'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'segurança',
      value: 'seg'
    });

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
