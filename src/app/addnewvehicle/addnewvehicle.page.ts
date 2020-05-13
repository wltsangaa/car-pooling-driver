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
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-addnewvehicle',
  templateUrl: './addnewvehicle.page.html',
  styleUrls: ['./addnewvehicle.page.scss'],
})
export class AddnewvehiclePage implements OnInit {
  public value: any = '';
  public license;
  public newvehicleData = [
    {
      label: 'Vehicle Brand',
      placeholder: 'Select Vehicle',
      data: [{
        'name': 'AUDI ',
      },
      {
        'name': 'BMW ',
      },
      {
        'name': 'NISSAN ',
      },
      {
        'name': 'TOYOTA ',
      },
      {
        'name': 'VOLKSWAGEN',
      },
      ]
    },
    {
      label: 'Year',
      placeholder: 'Select Year',
      data: [{
        'name': '2000',
      },
      {
        'name': '2001',
      },
      {
        'name': '2002',
      },
      {
        'name': '2003',
      },
      {
        'name': '2004',
      },
      {
        'name': '2005',
      },
      {
        'name': '2006',
      },
      {
        'name': '2007',
      },
      {
        'name': '2008',
      },
      {
        'name': '2009',
      },
      {
        'name': '2010',
      },
      {
        'name': '20011',
      },
      {
        'name': '20012',
      },
      {
        'name': '20013',
      },
      {
        'name': '20014',
      },
      {
        'name': '20015',
      },
      {
        'name': '20016',
      },
      {
        'name': '20017',
      },
      {
        'name': '20018',
      }
      ]
    }, {
      label: 'color',
      placeholder: 'Select color',
      data: [{
        'name': 'Black',
      },
      {
        'name': 'Yellow',
      },
      {
        'name': 'Red',
      },
      {
        'name': 'White',
      }
      ]
    },
    {
      label: 'Booking Type',
      placeholder: 'Select Booking Type',
      data: [{
        'name': '2 seat',
      },
      {
        'name': '5 seat',
      },
      {
        'name': '7 seat',
      },
      ]
    },
  ]
  valueName: any;


  constructor(public route: Router, public navctrl: NavController) { }

  ngOnInit() {
  }
  getValue(item: any) {
    this.valueName = item
    console.log('selected valiue name', this.valueName)
  }
  openpageTRansition() {
    // this.route.navigate(['vehiclemanagement']);
    this.navctrl.back();

  }
}
