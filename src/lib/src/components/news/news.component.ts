import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { CfCoreBusinessComponent } from '../core-business/core-business.component';
import { NewsCardModel, MapModelsService, SelectModel, ListModel, ButtonModel, IconModel, ImageModel, ImageStylingModel, ToolbarModel  } from 'cedrus-fusion';
import { MappingModel } from '../../models/mapping.model';
import { NewsComponentModel } from '../../models/news-component.model';

import { NewsService } from '../../services/news.service';

/**
 * <p>The news is created based on the news Card class (see <b>/models/card</b>).</p>
 * <p><b>Example of using the component:</b></p>
 * <pre>
 * <code><</code>cf-news <code>></code><code><</code><code>/</code>cf-news<code>></code>
 * </pre>
 */
@Component({
  selector: 'cf-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [ NewsService, MapModelsService ]
})

export class CfNewsComponent extends CfCoreBusinessComponent implements OnInit {
  /**
   * <p> An array of NewsCardModel to be bound to then News-Card component.</p>
   */
  news: NewsCardModel[] = [];

  /**
   * <p> The settings of the news Component passed from the user.</p>
   */
  @Input()
  settings: NewsComponentModel;

  /**
   * <p> The list object that is bound to the html template.</p>
   */
  myList = new ListModel ({
		title: ''
	});

  items= [];

  /**
   * <p> An array of image settings created internally on initialize based on the source channels thta the user passed.</p>
   */
  imageSettings: Object[] = [];

  toolbarProperties = {};

  newsToolbar: ToolbarModel = {  
    template: 'BUSINESS_1',  
    content: {
      title: 'News'
    },
    toggle: {
      show: true,
      minimizeIcon: new IconModel( {
        name: "remove",
        size: "20px",
      }),
      maximizeIcon: new IconModel( {
        name: "web_asset",
        size: "20px",
      })
    }
  }

  /**
   * <p> It is the constructor for the news component.</p>
   * <p> It has the news service and the mapping services as injectables.</p>
   */
  constructor(public elementRef: ElementRef, private newsService: NewsService, private mappingService: MapModelsService) {
    super(elementRef);
   }

  ngOnInit() {
    super.ngOnInit();
    this.error = false;
    this.id = this.settings.id;
    this.mappings = [
      { source:"title", target:"title" },
      { source:"description", target:"description" },
      { source:"author", target:"author" },
      { source:"publishedAt", target:"date" },
      { source:"url", target:"url" },
      { source:"urlToImage", target:"image" }
    ];

    for(let source of this.settings.channelList)
    {
      let url = "";
      switch(source)
      {
        case "cnn": url="https://cdn1.iconfinder.com/data/icons/metro-ui-dock-icon-set--icons-by-dakirby/128/CNN.png"; break;
        case "bbc-news": url="http://icons.iconarchive.com/icons/stalker018/mmii-flat-vol-2/128/bbc-icon.png"; break;
        case "mtv-news": url="http://wfarm1.dataknet.com/static/resources/icons/set57/42f839c7.png"; break;
        case "the-new-york-times": url="https://cdn0.iconfinder.com/data/icons/circle-icons/128/new_york_times.png"; break;
        case "fox-sports": url="https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/128/Fox_News.png"; break;
        case "espn": url="http://www.brautech.co.za/cds/channels/espn.png"; break;
        default: url="";
      }
      let imageSet = new ImageModel({
        url:url
      });
      let imageStyles = new ImageStylingModel({
        image:{
          class: "small-image"
        }
      })
      let selected = false;
      if(source==this.settings.defaultChannel)
        selected= true;
      this.imageSettings.push({settings: imageSet, styles:imageStyles, source: source, selected: selected});
    }

    this.changeChannel(this.settings.defaultChannel);

    this.toolbarProperties = {
      showToolbar: this.settings.showToolbar,
      width:this.settings.width,
			height:this.settings.height,
      toolbar: this.newsToolbar
    }
  }

  /**
   * <p> This function is activated when the user switch channels in the cf-select component.</p>
   * <p>It calls the news service and maps the returned news to the NewsCardModel by calling the mapToNewsCard Method.</p>
   */
  changeChannel(newChannel: string) {
    if(newChannel!==null && newChannel!=="")
    {
      this.newsService.getNews(newChannel).subscribe(news => this.mapToNewsCard(news, newChannel), error => {this.error=true;});
      for(let setting of this.imageSettings)
      {
        if(setting["source"]==newChannel)
          setting["selected"]=true;
        else
          setting["selected"]=false;
      }

    }
  }

  /**
   * <p> This function maps the object sent as a paramter to the NewsCardModel by calling the map method in the mapping service and providing the respective amppings/</p>
   */
  mapToNewsCard(newsArticles: Object[], sourceChannel: string)
  {
    this.error = false;
    this.news = [];
    for(let article of newsArticles)
    {
      let newNews = new NewsCardModel(this.mappingService.map(article, this.mappings));
      if(newNews.description!=null)
      {
        newNews.description = newNews.description.substring(0,100)+"...";
        this.news.push(newNews);
      }
    }
    this.items = this.news;
  }

  /**
   * <p> This function is called when the user pressed on a list item. It opens a new window with the respective url.</p>
   * @param $event <p> The name of the channel that the user pressed on.</p> 
   */
  readMore($event) {
      let win = window.open( $event["cfRow"]["url"]);
  }

  getClass(selected: boolean)
  {
    if(selected)
      return "selected";
    else
      return "not-selected";
  }
}
