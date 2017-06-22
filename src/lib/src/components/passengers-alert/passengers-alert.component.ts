import { Component, OnInit, ElementRef } from '@angular/core';
import { CfCoreBusinessComponent } from '../core-business/core-business.component';
import { MdSnackBar } from '@angular/material';

import {
  CfSendMessageSettings,
  CfSendMessageModes,
  CfSendMessageEmailSettings,
  CfSendMessageSMSSettings,
  Passenger,
} from '../../models/send-message.model';

@Component({
  
  selector: 'cf-passengers-alert',
  templateUrl: './passengers-alert.component.html',
  styleUrls: ['./passengers-alert.component.scss']
})
export class CfPassengersAlertComponent extends CfCoreBusinessComponent implements OnInit {

  passengerList: Passenger[];
  selectedPassenger: Passenger;

  constructor(
    private elRef: ElementRef,
    // private pageService: PageService,
  ) {
    super(elRef);
  }

  ngOnInit() {
    super.ngOnInit();

    this.passengerList =  [
      {
        avatarUrl: 'assets/images/material_avatars/actor_material.png',
        name: 'Chris Carrick',
        cityTo: 'Seattle',
        cityFrom: 'New York',
        message: 'Your flight AA1234 has been delayed. Expected takeoff time set for 12:30PM',
        email: 'chris.carrick@cedrusco.com',
      },
      {
        avatarUrl: 'assets/images/material_avatars/actress_material.png',
        name: 'Lisa Robison',
        cityTo: 'Atlanta',
        cityFrom: 'New York',
        message: 'Your flight DL0004 gate has changed. Head to B35 in Terminal 2',
        sms: '+16318356587'
      },
      {
        avatarUrl: 'assets/images/material_avatars/agent_material.png',
        name: 'Nicolas Jabbour',
        cityTo: 'Chicago',
        cityFrom: 'New York',
        message: 'Your flight DL0004 gate has changed. Head to B35 in Terminal 2',
        email: 'nicolas@cedrusco.com'
      }
    ];

    this.selectedPassenger = this.passengerList[0];
  }

  getPassengerMessageMode(passenger: Passenger) {
    if (passenger.sms) {
      return CfSendMessageModes.SMS;
    } else if (passenger.email) {
      return CfSendMessageModes.EMAIL;
    }
  }

  getPassengerMessageSettings(passenger: Passenger): CfSendMessageSettings {
    let sendMessageSMSSettings: CfSendMessageSMSSettings;
    let sendMessageEmailSettings: CfSendMessageEmailSettings;

    if (passenger.sms) {
      sendMessageSMSSettings = {
        toNumber: passenger.sms,
        fromNumber: '+16319047068',
        accountSid: 'ACb33c7f7db863dcc41d803f75d9758f98',
        authToken: 'c9ab414697e600b5cd34d61c6fafde7f',
        endpoint: 'http://localhost:8080/send_sms_message',
      };
    } else if (passenger.email) {
      sendMessageEmailSettings = {
        toAddress: passenger.email,
        fromAddress: 'chris.carrick@cedrusco.com',
        endpoint: 'http://localhost:8080/send_email_message',
        smtpConfig: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'chris.carrick@cedrusco.com',
            pass: 'leeesa7*'
          }
        }
      };
    }

    return {
      sms: sendMessageSMSSettings,
      email: sendMessageEmailSettings,
    };
  }

  // handleRowClick(passenger: Passenger) {
  //   this.pageService.updateSelectedCity(passenger.cityTo);
  // }

}
