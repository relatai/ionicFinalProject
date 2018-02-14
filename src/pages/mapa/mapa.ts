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
})
export class MapaPage {

  tabBarElement: any;
  splash = true;

  testCheckboxResult: any;
  testCheckboxOpen: boolean;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps,public alertCtrl: AlertController) {
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

  mostrarMensagem() {
    let prompt = this.alertCtrl.create({
      title: 'Identificação',
      message: "Digite o número do seu celular",
      inputs: [
        {
          name: 'title',
          placeholder: 'ex: (99) 9 9999-9999'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            //console.log('Cancel clicked');
            alert('Cancelado.');
          }
        },
        {
          text: 'Entrar',
          handler: data => {
            //console.log('Saved clicked');
            alert('Celular adicionado.');
          }
        }
      ]
    });
    prompt.present();
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
               //alert('clicked');
               this.mostrarMensagem();
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
