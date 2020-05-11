import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-e404',
  templateUrl: './e404.page.html',
  styleUrls: ['./e404.page.scss'],
})
export class E404Page implements OnInit {

  constructor( public navCtrl: NavController ) { }

  ngOnInit() {
  }

  // Ação do botão
  goBack() {
    this.navCtrl.navigateForward('home');
  }
}
