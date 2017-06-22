import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CfSendMessageService {
  constructor(private http: Http) { }

  sendMessage(endpoint: string, messageObject: any): Observable<Response> {
    return this.http.post(endpoint, messageObject);
  }
}