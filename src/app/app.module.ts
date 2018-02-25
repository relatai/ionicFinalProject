import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GoogleMaps } from '@ionic-native/google-maps';
import { MapaPage } from '../pages/mapa/mapa';
import { MostrarMeusRelatosPage } from '../pages/mostrar-meus-relatos/mostrar-meus-relatos';
import { RelatarProblemaPage } from '../pages/relatar-problema/relatar-problema';
import { SobrePage } from '../pages/sobre/sobre';
import { Camera } from '@ionic-native/camera';
import { IdentificacaoProvider } from '../providers/identificacao/identificacao';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MapaPage,
    MostrarMeusRelatosPage,
    RelatarProblemaPage,
    SobrePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MapaPage,
    MostrarMeusRelatosPage,
    RelatarProblemaPage,
    SobrePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IdentificacaoProvider
  ]
})
export class AppModule {}
