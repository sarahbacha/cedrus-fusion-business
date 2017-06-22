import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { CfSendMessageModes, CfSendMessageSettings, CfSendMessageSMSSettings, CfSendMessageAlerts } from '../../models/send-message.model';
import { CfSendMessageService } from '../../services/send-message.service';
import { CfCoreBusinessComponent } from '../core-business/core-business.component';

@Component({
  selector: 'cf-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class CfSendMessageComponent extends CfCoreBusinessComponent implements OnInit {

  // message input optional.  can just have default message;

  @Output()
  onSendMessage = new EventEmitter();

  @Input()
  inputMessage: string;

  @Input()
  settings: CfSendMessageSettings;

  @Input()
  sendMessageMode: CfSendMessageModes;

  @Input()
  alert: CfSendMessageAlerts;

  @Input()
  mini = false;

  lastButtonPressed: string;

  expanded = false;
  messageSent = false;

  constructor(
    private sendMessageService: CfSendMessageService,
    private elRef: ElementRef,
    private snackBar: MdSnackBar,
  ) {
    super(elRef);
  }

  ngOnInit() {
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  shouldShowIconButton(buttonName: string): boolean {
    const { SMS, EMAIL, ANY } = CfSendMessageModes;

    if (!this.expanded) {
      return false;
    }

    if (this.sendMessageMode === ANY) {
      return true;
    }

    switch (buttonName) {
      case 'SMS':
        return this.sendMessageMode === SMS;
      case 'EMAIL':
        return this.sendMessageMode === EMAIL;
    }
  }

  handleSubmit(f: NgForm) {
    if (this.sendMessageMode === CfSendMessageModes.ANY) {
      if (this.lastButtonPressed === 'SMS') {
        this.handleSMSClick(f.value.message);
      } else {
        this.handleEmailClick(f.value.message);
      }
    } else if (this.sendMessageMode === CfSendMessageModes.SMS) {
      this.handleSMSClick(f.value.message);
    } else {
      this.handleEmailClick(f.value.message);
    }
  }

  setAnySMS() {
    this.lastButtonPressed = 'SMS';
  }

  setAnyEmail() {
    this.lastButtonPressed = 'EMAIL';
  }

  handleSMSClick(message: string) {
    const messageObject = {
      message: message,
      toNumber: this.settings.sms.toNumber,
      fromNumber: this.settings.sms.fromNumber,
      accountSid: this.settings.sms.accountSid,
      authToken: this.settings.sms.authToken,
    };

    this.sendMessageService.sendMessage(this.settings.sms.endpoint, messageObject)
      .subscribe((res: Response) => {
        res = res.json();

        if (this.onSendMessage) {
          this.onSendMessage.emit(res);
        }


        this.snackBar.open('Hello');
        this.messageSent = true;
      });
  }

  handleEmailClick(message: string) {
    const messageObject = {
      message: message,
      toAddress: this.settings.email.toAddress,
      fromAddress: this.settings.email.fromAddress,
      smtpConfig: this.settings.email.smtpConfig,
    };

    this.sendMessageService.sendMessage(this.settings.email.endpoint, messageObject)
      .subscribe((res: Response) => {
        res = res.json();

        if (this.onSendMessage) {
          this.onSendMessage.emit(res);
        }

        this.snackBar.open('Hello');
        this.messageSent = true;
      });
  }

  handleMiniFabClick() {
    if (this.sendMessageMode === CfSendMessageModes.SMS) {
      this.handleSMSClick(this.inputMessage);
    } else {
      this.handleEmailClick(this.inputMessage);
    }
  }

}
