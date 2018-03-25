import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { timer } from 'rxjs/Observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  splashScreen: any;
  statusBar: any;
  platform: any;
  rootPage:any = TabsPage;
  showSplash = true;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  initializeApp(){
    this.platform.ready().then(() =>{
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(3000).subscribe(()=> this.showSplash = false)
    });
  }

}
