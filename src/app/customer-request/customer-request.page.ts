/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { Component, OnInit } from '@angular/core';
import { ViewController } from '@ionic/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { DriverStatusService } from '../driver-status.service';

@Component({
  selector: 'app-customer-request',
  templateUrl: './customer-request.page.html',
  styleUrls: ['./customer-request.page.scss'],
})
export class CustomerRequestPage implements OnInit {

  public userRequests: Array<any> = [];
  public acceptRideToggle: boolean = false;

  constructor(public modalController: ModalController, 
    public navCtrl:NavController, 
    public router:Router, 
    public location: Location,
    public driverService:DriverStatusService) { }

  ngOnInit() {
    this.userRequests = [
      {
        userName:'passenger demo',
        userImage:'../../assets/passenger.jpg',
        price:'$25',
        distance:2.2,
        pickupLocation:'HKUST North gate',
        dropOffLocation:'Kwai chung street 188',
        checked: false
      },
      {
        userName:'Ben',
        userImage:'../../assets/user3.jpeg',
        price:'$35',
        distance:3,
        pickupLocation:'HKUST West gate',
        dropOffLocation:'150 Kennedy Road WAN CHAI HONG',
        checked: false
      },
      {
        userName:'William',
        userImage:'../../assets/user1.jpeg',
        price:'$50',
        distance:5,
        pickupLocation:'HKUST North gate',
        dropOffLocation:'Mei Fo New Estate',
        checked: false
      },
      {
        userName:'Johnny Dan',
        userImage:'../../assets/user3.jpeg',
        price:'$60',
        distance:6,
        pickupLocation:'HKUST west gate',
        dropOffLocation:'City University of Hong Kong, Tat Chee Avenue',
        checked: false
      },
      {
        userName:'Zoe Tse',
        userImage:'../../assets/user2.jpeg',
        price:'$30',
        distance:3.1,
        pickupLocation:'HKUST north gate',
        dropOffLocation:'Mong Kok Dundas Street',
        checked: false
      },

    ]
  }

  userRiderDetails(index){
    console.log(index)
  
    this.userRequests.map((el,i) => {
      if (index === i) {
        this.userRequests[index].checked = ! this.userRequests[index].checked
      } else {
        el.checked = false
      }
    
      
     });
  }

  requestAccept(){
    this.driverService.userCard = true;
    this.router.navigate(['home',{userCard:true}])
    // this.modalController.dismiss();
  }
  requestCancel(){
    this.driverService.userCard = false;
    this.router.navigate(['home',{userCard:false}])
  }


}
