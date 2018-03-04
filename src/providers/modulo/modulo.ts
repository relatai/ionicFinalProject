import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Injectable()
export class ModuloProvider {

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
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
