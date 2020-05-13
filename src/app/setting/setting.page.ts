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
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public driverDetails = {};
  public driverDocuments: Array<any> = [];
  public otherDetails: Array<any> = [];

  constructor(public route: Router) { }

  ngOnInit() {
    this.driverDetails = {
      profileImage: '../../assets/driver.png',
      driverName: 'Demon driver',
      memberType: 'Regular Member',
      vehicle: [],
      document: [],
      review: ''
    }
    this.driverDocuments = [
      { icon: 'car', title: 'Your Vehicle', background: '#3668E4', page: 'vehiclemanagement' },
      { icon: 'document', title: 'Your Document', background: '#3668E4', page: 'documentmanagement' },
      { icon: 'star', title: 'Review', background: '#3668E4' },
     
    ]

    this.otherDetails = [
      { icon: 'notifications', title: 'Notifications', background: '#3668E4', page: 'notifications' },
      { image: '../../assets/crown.png', title: 'Terms and Privacy Policy', background: '#3668E4', page: 'terms-condictions' },
      { icon: 'help-circle-outline', title: 'Contact Us', background: '#3668E4', page: 'contact-us' },
    ]
  }

  goToProfile() {
    console.log('profile Page');
    this.route.navigate(['profile']);
  }
  documentPage(page) {
    if (page) {
      this.route.navigate([page]);
      console.log(page);
    }
  }
  otherPage(page) {
    if (page) {
      this.route.navigate([page]);
    }
  }
}
