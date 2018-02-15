import { Component } from '@angular/core';
import { MapaPage } from '../mapa/mapa';
import { SobrePage } from '../sobre/sobre';
import { RelatarProblemaPage } from '../relatar-problema/relatar-problema';
import { MostrarMeusRelatosPage } from '../mostrar-meus-relatos/mostrar-meus-relatos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  MapaRoot = MapaPage;
  relatarProblemaRoot = RelatarProblemaPage;
  mostrarMeusRelatosRoot = MostrarMeusRelatosPage;
  SobreRoot = SobrePage

  //MapaRoot = 'MapaPage'
  //relatarProblemaRoot = 'RelatarProblemaPage'
  //mostrarMeusRelatosRoot = 'MostrarMeusRelatosPage'
  //SobreRoot = 'SobrePage'

  constructor() {

  }
}
