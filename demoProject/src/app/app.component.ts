import { Component, OnInit } from '@angular/core';
import { WeatherComponentModel } from '../../../src/lib';
import { NewsComponentModel } from '../../../src/lib';
import { BpmTaskListModel } from '../../../src/lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	
	//WEATHER COMPONENT
  // demoWeather = new WeatherComponentModel ({
	// 	defaultCity:"Paris"
	// });
  
  // compEvents: string= "";
  // log(ev): void { this.compEvents = ev; }


  //NEWS COMPONENT
  // channels:[
	// 	{code: 'cnn', label: 'CNN'}, 
	// 	{code: 'bbc-news', label: 'BBC'}, 
	// 	{code: 'mtv-news', label: 'MTV News'}, 
	// 	{code: 'the-new-york-times', label: 'New York Times'},
	// 	{code: 'fox-sports', label: 'Fox Sports'},
	// 	{code: 'espn', label: 'ESPN'}
	// ];
	// newsDemo= new NewsComponentModel({
	// 	id:"news1",
	// 	defaultChannel: "the-new-york-times",
	// 	channelList:[ 'cnn', 'mtv-news', 'the-new-york-times', 'fox-sports'],
	// 	showChannelList: true,
	// 	showItems: 4
	// });
  // readMore($event)
  // {
	//   let title = $event.title;
	//   alert("You pressed on "+title);
  // }

	/**
	 * Represents a customized theme for some components in the application
	 */
  themeName: string = '';

	demoBPMList = new BpmTaskListModel({
		bpmUrl:"https://174.129.47.63:9443/rest/bpm/wle/v1/search/query?condition=bpdName%7CPatient+Enrollment+Process&condition=taskStatus%7CReceived&condition=taskSubject%7CNotEquals%7CStep%3A+Enroll+a+Patient&organization=byInstance&run=true&shared=false&filterByCurrentUser=true",
		username: "bpmadmin",
		password: "C3drus123"
	});

	BPMListProperties =  {
		width:"500px",
		height:"100%"
	};  
}
