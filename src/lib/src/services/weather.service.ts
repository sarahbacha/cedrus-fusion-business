import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class WeatherService {

  city = "";
  weatherUrl = "https://twcservice.mybluemix.net/api/weather/v1/geocode/";
  geolocationUrl="http://maps.google.com/maps/api/geocode/json?address=";

  cred = {
    "username": "a0210ba5-961b-40c9-b173-9d116d065a28",
    "password": "wT11yg9dPG",
    "host": "twcservice.mybluemix.net",
    "port": "443",
    "url": "https://a0210ba5-961b-40c9-b173-9d116d065a28:wT11yg9dPG@twcservice.mybluemix.net"
};


  constructor(private http: Http) { }

  getWeather(coordinates: Object): Observable<Object[]> {
    let coor = coordinates["lat"]+"/"+coordinates["lng"];
    let username : string = this.cred.username;
    let password : string = this.cred.password;
    let headers = new Headers();
    headers.append('Authorization', 'Basic '+ btoa(username + ':' + password));

    return this.http.get(this.weatherUrl+coor+"/forecast/daily/7day.json",{headers: headers})
      // ...and calling .json() on the response to return data
      .map(this.extractJson)
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    extractJson(res: Response)
    {
        let result =  res.json();
        let dailyWeath: Object[] = [];
        for(let data of result["forecasts"])
        {
            let image = "";
            if(data["day"]!=null)
                image = "https://raw.githubusercontent.com/IBM-Bluemix/insights-weather/master/public/images/weathericons/icon"+data["day"]["icon_code"]+".png";
            else
                image = "https://raw.githubusercontent.com/IBM-Bluemix/insights-weather/master/public/images/weathericons/icon"+data["night"]["icon_code"]+".png";
            let max_temp = "";
            if(data["day"]!=null)
                max_temp = data["max_temp"];
            else
                max_temp = data["min_temp"]
            let weath = {
                name: data["dow"].substring(0, 3).toUpperCase(),
                maxTemp: max_temp,
                minTemp: data["min_temp"],
                description: data["narrative"],
                image: image
            };
            dailyWeath.push(weath);
        }
        return dailyWeath;
    }

    getCoordinates(name:string): Observable<Object>{
      return this.http.get(this.geolocationUrl+name)
        // ...and calling .json() on the response to return data
        .map(this.extractCoordinatesJson)
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }
    extractCoordinatesJson(res: Response)
    {
        let result =  res.json()["results"][0]["geometry"]["location"];
        return result;
    }

}