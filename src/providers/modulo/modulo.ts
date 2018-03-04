import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ModuloProvider {

  constructor(private toastCtrl: ToastController) {
  }

  toastTopLong(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 7000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Fechou o toast');
    });
    toast.present();
  }
  
  toastTopShort(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Fechou o toast');
    });
    toast.present();
  }
  
  toastButtomLong(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 7000,
      position: 'buttom'
    });
    toast.onDidDismiss(() => {
      console.log('Fechou o toast');
    });
    toast.present();
  }

  toastButtomShort(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'buttom'
    });
    toast.onDidDismiss(() => {
      console.log('Fechou o toast');
    });
    toast.present();
  }

}
