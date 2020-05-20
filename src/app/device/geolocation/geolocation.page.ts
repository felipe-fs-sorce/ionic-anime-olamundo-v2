import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;


@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {

  public latitude: any;
  public longitude: any;

  constructor() { }

  async ngOnInit() {

    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Onde estou? ', coordinates.coords);

    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;

    const wait = Geolocation.watchPosition({}, (position, err) => {
      console.log('Bússola: ', position);
    });
  }
}