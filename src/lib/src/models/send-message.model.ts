export class CfSendMessageSMSSettings {
  constructor(
    public toNumber: string,
    public fromNumber: string,
    public accountSid: string,
    public authToken: string,
    public endpoint: string,
  ) { }
}

export class CfSendMessageEmailSettings {
  constructor(
    public toAddress: string,
    public fromAddress: string,
    public endpoint: string,
    public smtpConfig: any,
  ) { }
}

export class CfSendMessageSettings {
  constructor(
    public sms?: CfSendMessageSMSSettings,
    public email?: CfSendMessageEmailSettings,
  ) { }
}

export enum CfSendMessageModes {
  SMS,
  EMAIL,
  ANY,
}

export enum CfSendMessageAlerts {
  MUTE,
  UNMUTE,
}

export class Passenger {
  constructor(
    public avatarUrl: string,
    public name: string,
    public cityTo: string,
    public cityFrom: string,
    public message: string,
    public email?: string,
    public sms?: string,
  ) { }
}
