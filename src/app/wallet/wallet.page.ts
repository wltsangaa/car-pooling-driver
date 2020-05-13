
/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit, OnChanges {
  data: any = [];
  public walletPage: any ='cash';
  constructor() {
    this.data = [{
      'name': 'Alan',
      'amount': '$25.50',
      'image': '../../assets/img/MoneySign.jpg'
    }, {
      'name': 'William',
      'amount': '$50.50',
      'image': '../../assets/img/MoneySign.jpg'
    }, {
      'name': ' Cindy',
      'amount': '$70',
      'image': '../../assets/img/MoneySign.jpg'
    }, {
      'name': 'KK',
      'amount': '$223',
      'image': '../../assets/img/MoneySign.jpg'
    }, {
      'name': 'Ken Tsang',
      'amount': '$67.5',
      'image': '../../assets/img/MoneySign.jpg'
    }, {
      'name': 'Brain Lee',
      'amount': '$22.50',
      'image': '../../assets/img/MoneySign.jpg'
    }]

  }
  segmentChanged(ev: any) {
    console.log('sgennkjkhkjkjk');
    console.log('Segment changed button clicked', ev);
   }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log('change')
  }

}
