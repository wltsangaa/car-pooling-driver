/**
 * Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ModalController,
  MenuController,
  AlertController,
  NavParams,
  LoadingController
} from '@ionic/angular';
import { CustomerRequestPage } from '../customer-request/customer-request.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DriverStatusService } from '../driver-status.service';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../firestore.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public zoom: number = 12;
  public lat: number = 26.8549;
  public lng: number = 75.8243;
  public markerUrl = '../../assets/markerPin.png';
  public driveStatus: boolean = false;
  public origin: any;
  public destination: any;
  public userId: any;
  public userData: any; // user data
  public locationOrigin: any; // driver location on ngOnInit
  public customerId: any; // customer id here
  private rideAlert: any;
  timeout: any;
  public renderOpts = {
    suppressMarkers: true
  };
  public directionOptions = {
    origin: {
      icon: '../../assets/Google-Car.png'
    },
    destination: {
      icon: '../../assets/distinationsMaker.png',
      opacity: 0.8
    }
  };

  public style = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5'
        }
      ]
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161'
        }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5'
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161'
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e'
        }
      ]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5'
        }
      ]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e'
        }
      ]
    }
  ];

  constructor(
    private router: Router,
    public modalController: ModalController,
    private geolocation: Geolocation,
    private menuCtrl: MenuController,
    public alertController: AlertController,
    private activeRouter: ActivatedRoute,
    public driverService: DriverStatusService,
    private auth: AuthService,
    public loadingCtrl: LoadingController,
    private fire: FirestoreService,
    private http: HttpClient,
    private afAuth: AngularFireAuth,
  ) {
    console.log(driverService.driverStatus);
    this.driveStatus = driverService.driverStatus;
    console.log('construct');
  }

  ngOnInit() {
    this.getDirection();
    console.log('ngonit');

    this.rideAlert = null;
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
    this.afAuth.auth.onAuthStateChanged(user => {
      console.log(user);
      this.userId = user.uid;
      this.getcurrentLocations();
      this.fire.currencyFilter.subscribe(res => {
        console.log(res);
        if (res && !this.driverService.rideInProgress) {
          const checkRide = res['requestRide'];
          const available = res['available'];

          this.driveStatus = available;
          if (checkRide === true && available) {
            this.openAction(res);
          } else {

          }
        }

      })
      if (user) {
        this.fire.checkUpdate(user.uid).subscribe(res => {
          console.log(res);
        });
      }

    });
  }

  driverNotResponding(customerId) {
    const obj = {};
    obj['uid'] = customerId;
    this.http
      .post(
        'https://us-central1-car-pooling-38f58.cloudfunctions.net/drivernotRespond',
        obj
      )
      .subscribe(async (res: any) => {
        console.log(res);
        if (res && res.status === 'ignored') {
          this.rideAlert.dismiss();
          this.rideAlert = null;
        }
      });
  }

  async openAction(res) {
    this.customerId = res.requestedUser;
    this.timeout = setTimeout(() => {
      this.driverNotResponding(this.customerId);
    }, 30000);


    if (!this.rideAlert) {
      this.rideAlert = await this.alertController.create({
        header: 'Alert!',
        message: 'A new ride is available',
        buttons: [
          {
            text: 'Reject',
            role: 'cancel',
            cssClass: 'secondary',
            handler: async blah => {
              // reject ride firebase function
              clearTimeout(this.timeout);
              const loader = await this.loadingCtrl.create({
                message: 'Please wait...',
              });
              loader.present();
              this.http
                .post(
                  'https://us-central1-car-pooling-38f58.cloudfunctions.net/rejectRide',
                  { userid: this.userId, custId: this.customerId }
                )
                .subscribe(res => {
                  loader.dismiss();
                  this.driverService.rideInProgress = false;
                  this.rideAlert = null;
                  console.log(res);
                });
            }
          },
          {
            text: 'Accept',
            handler: async () => {
              // accept ride firebase function
              clearTimeout(this.timeout);
              const loader = await this.loadingCtrl.create({
                message: 'Please wait...',
              });
              loader.present();
              this.http
                .post(
                  'https://us-central1-car-pooling-38f58.cloudfunctions.net/acceptRide',
                  
                  { custId: this.customerId }
                )
                .subscribe(res => {
                  console.log('Res', res)
                  // const parsedObj = JSON.parse(res['_body']);
                  const parsedObj = res;
                  console.log(parsedObj);
                  loader.dismiss();
                  this.driverService.rideInProgress = true;
                  this.rideAlert = null;
                  this.userData = parsedObj;
                });
            }
          }
        ]
      });
    }

    await this.rideAlert.present();
  }

  mapReady(a, event) {
    if (event) {
      console.log('event if');
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log(
      'dragEnd',
      $event,
      '$event.coords.lat',
      $event.coords.lat,
      '$event.coords.lng',
      $event.coords.lng
    );
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  driverStatusChange(event, val) {
    console.log('status', this.driveStatus, event, event.target.value, val);
    this.driverService.driverStatus = this.driveStatus;


    this.afAuth.auth.onAuthStateChanged(user => {
      console.log(user)
      this.fire.changeStatus(this.driveStatus, user.uid).then(res => {
        console.log(res);
      });
    });
  }

  goToCustomerDetail() {
    this.router.navigate(['customer-detail', { driverOrigin: this.locationOrigin, userOrigin: this.userData.origin }]);
  }

  getDirection() {
    console.log('directions');
    this.origin = { lat: 26.857114, lng: 75.8127086 };
    this.destination = { lat: 0.5 + 26.857114, lng: 0.5 + 75.8127086 };
    console.log('origin', this.origin, this.destination);
  }

  async completeRide() {
    const loader = await this.loadingCtrl.create({
      message: 'Completing your ride ...',
    });
    loader.present();
    this.afAuth.auth.onAuthStateChanged(user => {
      console.log(user)
      const obj = {};
      obj['driverId'] = user.uid;
      obj['custId'] = this.customerId;
      obj['custData'] = this.userData;
      console.log(obj);
      this.http
        .post(
          'https://us-central1-car-pooling-38f58.cloudfunctions.net/completeRide',
          obj)
        .subscribe((res: any) => {
          console.log(res);
          if (res.status === 'done') {
            this.userData = null;
            this.driverService.rideInProgress = false;
          }
          loader.dismiss();
        });
    });

  }

  requestAccept() {
    this.router.navigate(['customer-detail']);
  }

  async requestIgnore() {
    this.router.navigate(['customerRequest']);
  }

  public getcurrentLocations() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        console.log('resp', resp);
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        const obj = {};
        obj['lat'] = this.lat;
        obj['lng'] = this.lng;
        this.locationOrigin = obj;
        const uid = this.userId;
        // update driver's corodinate in the database
        this.fire.updateDriverData(obj, uid);
      })
      .catch(error => {
        console.log('Error getting location', error);
      });
  }
}
