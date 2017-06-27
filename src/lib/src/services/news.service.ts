import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class NewsService {

  apiKey = "&sortBy=top&apiKey=35715a9a13a548b990874cca6c88e757";
  url="https://newsapi.org/v1/articles?source=";
  source = "cnn";

  private cnnUrl = 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=35715a9a13a548b990874cca6c88e757';
  constructor(private http: Http) { }

  getNews(src: string): Observable<Object[]> {
    this.source = src;
    return this.http.get(this.url+this.source+this.apiKey)
      // ...and calling .json() on the response to return data
      .map(this.extractJson)
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    extractJson(res: Response)
    {
      let rawArticles = res.json()["articles"];
      let count = 0;
      let articles: any[] = [];
      for(let article of rawArticles)
      {
        count++;
        articles.push(article);
        if(count>9)
          break;
      }
      return articles;
    }

}