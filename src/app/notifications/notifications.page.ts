/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public notifications = [
    {
      title: 'system',
      subtitle: 'Booking 0001 is completed',
      iconUrl: '../../assets/tick.jpg',
    },
    {
      title: 'promotion',
      subtitle: 'use three times of the services to get 10% off',
      iconUrl: '../../assets/coupon.png',
    },

    {
      title: 'system',
      subtitle: 'Booking 0002 fails',
      iconUrl: '../../assets/error.jpg',
    },

    {
      title: 'system',
      subtitle: 'Booking 0003 is completed',
      iconUrl: '../../assets/tick.jpg',
    },


  ]
  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async notificationAlert(item) {
    const alert = await this.alertController.create({
      header: `${item.title}`,
      message: `${item.subtitle}`,
      buttons: ['OK']
    });

    await alert.present();
  }

}
