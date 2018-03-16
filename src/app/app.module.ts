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
import { Geolocation } from '@ionic-native/geolocation';
import { DadosMapaProvider } from '../providers/dados-mapa/dados-mapa';
import { ModuloProvider } from '../providers/modulo/modulo';
import { RelatoProvider } from '../providers/relato/relato';
import { ModalRelatoPage } from '../pages/modal-relato/modal-relato';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MapaPage,
    MostrarMeusRelatosPage,
    RelatarProblemaPage,
    SobrePage,
    ModalRelatoPage
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
    SobrePage,
    ModalRelatoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Camera,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IdentificacaoProvider,
    DadosMapaProvider,
    ModuloProvider,
    RelatoProvider
  ]
})
export class AppModule {}
