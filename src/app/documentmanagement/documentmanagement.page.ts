/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentmanagement',
  templateUrl: './documentmanagement.page.html',
  styleUrls: ['./documentmanagement.page.scss'],
})
export class DocumentmanagementPage implements OnInit {
  public documents = [{
    'name': 'Identification Card',
    'icon': 'person',
    'url':'/drivinglicense'
  }, {
      'name': 'Driving License',
      'icon': 'person',
      'url': '/drivinglicense'
    }]
  constructor(public route:Router) { }

  ngOnInit() {
  }
  gotoPage(item: any) {
    this.route.navigate([item])

  }
}
