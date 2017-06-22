import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BpmTaskListModel } from '../models/bpm-task-list/bpm-task-list.model';

@Injectable()
export class BpmTasksService {

  authToken: string = "";
  constructor(private http: Http) 
  { }
  
  getTasks(bpmList: BpmTaskListModel ): Observable<Object[]> {
    let username : string = bpmList.username;
    let password : string = bpmList.password;
    let bpmUrl: string = bpmList.bpmUrl;
    this.authToken = 'Basic ' + btoa(username + ':' + password);
    console.log("GetTasks "+this.authToken);
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    
    if((username==null || username=="") && (password==null || password==""))
    {
      return this.http.get(bpmUrl)
        // ...and calling .json() on the response to return data
        .map(res => this.extractJson(res, bpmUrl))
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    else
    {
      console.log(bpmUrl);
      return this.http.put(bpmUrl,null,{headers: headers})
        // ...and calling .json() on the response to return data
        .map(res => this.extractJson(res, bpmUrl))
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
  }

  extractJson(res: Response, url: string)
  {
      let result =  res.json();
      if(url.indexOf("localhost:3000")>=0)
        return result;
      else
        return result["data"]["data"];
  }

  acceptTask(bpmList: BpmTaskListModel, taskid: string): Observable<Object[]>{
    let username : string = bpmList.username;
    let password : string = bpmList.password;
    let bpmUrl: string = bpmList.bpmUrl;
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    console.log("Accept Tasks "+this.authToken);
    
    if((username==null || username=="") && (password==null || password==""))
    {
      return this.http.get(bpmUrl)
        // ...and calling .json() on the response to return data
        .map(res => this.handleResponse(res, bpmUrl))
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    else
    {
      bpmUrl = bpmUrl.split("search")[0]+"task/"+taskid+"?action=finish&parts=all";
      headers.append("action","finish");
      headers.append("parts","all");
      console.log(bpmUrl);
      return this.http.put(bpmUrl,null,{headers: headers})
        // ...and calling .json() on the response to return data
        .map(res => this.handleResponse(res, bpmUrl))
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
  }

  rejectTask(bpmList: BpmTaskListModel, taskid: string): Observable<Object[]>{
    let username : string = bpmList.username;
    let password : string = bpmList.password;
    let bpmUrl: string = bpmList.bpmUrl;
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    
    if((username==null || username=="") && (password==null || password==""))
    {
      return this.http.get(bpmUrl)
        // ...and calling .json() on the response to return data
        .map(res => this.handleResponse(res, bpmUrl))
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    else
    {
      bpmUrl = bpmUrl.split("search")[0]+"task/"+taskid;
      headers.append("action","cancel");
      console.log(bpmUrl);
      return this.http.put(bpmUrl,null,{headers: headers})
        // ...and calling .json() on the response to return data
        .map(res => this.handleResponse(res, bpmUrl))
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
  }

  handleResponse(res: Response, url: string)
  {
      console.log("Response: "+res);
      return null;
  }

}
