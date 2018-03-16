import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@IonicPage()
@Component({
  selector: 'page-modal-relato',
  templateUrl: 'modal-relato.html',
})
export class ModalRelatoPage {
  relato:any;
  constructor( public navParams: NavParams, public viewCtrl:ViewController) {
    this.relato = this.navParams.get("relato");
  }

  ionViewDidLoad() {
  }

  fecharModalRelato(){
    this.viewCtrl.dismiss();
  }

}
