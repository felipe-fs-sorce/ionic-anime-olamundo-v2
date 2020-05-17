import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Device } = Plugins;

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  info: any;
  batinfo: any;
  lang: any;
  outBat: any;
  outBatCharge: any;
  outSystemOp: any;

  constructor() { }

  async ngOnInit() {

    // Acesso ao status do sistema
    this.info = await Device.getInfo();
    console.log(this.info);
    this.outSystemOp = this.info.operatingSystem;

    // Acesso ao status da bateria
    this.batinfo = await Device.getBatteryInfo();
    console.log(this.batinfo);
    this.outBat = this.batinfo.batteryLevel;
    this.outBatCharge = this.batinfo.isCharging;

    // Qual o idioma do dispositivo
    this.lang = await Device.getLanguageCode();
    console.log(this.lang);
  }
}