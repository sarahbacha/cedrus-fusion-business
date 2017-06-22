import { Component, OnInit, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CfCoreBusinessComponent } from '../core-business/core-business.component';
import { IconModel, InputModel, SelectModel, ButtonModel, StandardCardModel, I18NService, ToolbarModel, CfEventService, MapModelsService } from 'cedrus-fusion';


import { EventDataModel } from '../../models/event-data.model';
import { WeatherModel } from '../../models/weather/weather.model';
import { CoreBusinessModel } from '../../models/core-business/core-business.model';
import { WeatherComponentModel } from '../../models/weather/weather-component.model';
import { WeatherService } from '../../services/weather.service';
import { MappingModel } from '../../models/mapping.model';

import { Subscription } from 'rxjs/Subscription';


/**
 * This component refers to a Weather app.
 */
@Component({
  selector: 'cf-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [ WeatherService, MapModelsService ]
})
export class CfWeatherComponent extends CfCoreBusinessComponent implements OnInit {
	/**
	 * <p> The subscription object for the internationalization service.</p>
	 */
    onLangChangeSubscription: Subscription;

	/**
	 * <p>The weather component object that is bound in the template/</p>
	 */
	cfWeather: WeatherComponentModel;

	/**
	 * <p> It represents the list of cities to initialize the component with.</p>
	 */
    @Input()
    settings: WeatherComponentModel;

	/**
	 * <p> Array of the weather for the next 6/7 days.</p>
	 */
	days: Object[] = [];

	/**
	 * <p> The object holding the weather info for today.</p>
	 */
	today: Object = {};

    /**
	 * <p> "Today" translated to local language.</p>
	 */
    todayLabel: string = "Today";

	/**
	 * <p> The input settings for the input component.</p>
	 */
    cityInput =  new InputModel ({
		type : "text",
		placeholder: "City",
		prefix : "",
		maxlength : "",
		width: "80%",
		dividerColor : "primary",
		value : "",
		icon: {
			name: "room",
			type: "mi",
			size: "14px",
			color: {
				foreground: "white",
				background: "transparent"
			}
		},
		iconPosition:"left",
		menu: null
	});

	toolbarProperties: CoreBusinessModel;
	
	weatherToolbar: ToolbarModel = {
		template: 'BUSINESS_1',
    info: {
      show: true,
      order: 'second-section',
      icon: new IconModel({
        name: 'more_vert',
        size: '20px',
	    })
	  },
    content: {
      title: 'Weather',
      order: 'first-section',
    },
    toggle: {
    	show: true,
      minimizeIcon: new IconModel({
        name: "remove",
        size: "20px"
      }),
      maximizeIcon: new IconModel({
        name: "web_asset",
        size: "20px"
      })
    }
  }

  constructor(public elementRef: ElementRef, private weatherService: WeatherService,
		 private mappingService: MapModelsService, private eventService: CfEventService, private i18nService: I18NService)
	{
		super(elementRef);
	}

	/**
	 * <p> This method is called when initializing the component.</p>
	 * <p> It initializes the mapping to the service and initializes the component with the user's default cities.</p>
	 */
    ngOnInit() {
        super.ngOnInit();
		this.title="Weather";
    	this.error = false;
		this.cfWeather = this.settings;
		if(this.settings.id!=null)
			this.id = this.settings.id;
		this.themeClass = "whiteTheme";
		this.cityInput.value = this.settings.defaultCity;
		this.mappings = [
			{ source:"dow", target:"name" },
			{ source:"narrative", target:"description" },
			{ source:"max_temp", target:"max_temp" },
			{ source:"min_temp", target:"min_temp" },
			{ source:"image", target:"image" }
			];
		this.initCity();

        // internationalize component
        this.internationalize( this.i18nService.getLocale() );

        // re-internationalize component in case of locale change
        this.onLangChangeSubscription = this.i18nService.onLangChange.subscribe(locale => {
            this.internationalize(locale);
        });

		this.checkEventMapping("weather");

		this.toolbarProperties = new CoreBusinessModel({
			showToolbar: this.settings.showToolbar,
			width: this.settings.width,
			height: this.settings.height,
			toolbar: this.weatherToolbar
		});
    }

    /**
     * <p>This method is called when component is destroyed</p>
     */
    ngOnDestroy() {
        // prevent memory leak when component destroyed
		super.ngOnDestroy();
        this.onLangChangeSubscription.unsubscribe();
    }

    /**
	 * <p> This method is called to initialize the component with the user's chosen cities/</p>
	 */
    initCity() {
		this.weatherService.getCoordinates(this.cfWeather.defaultCity).subscribe(coor => this.getWeather(coor), error => {this.error = true;});
    }
	/**
	 * <p> Gets the weather of a city by providing it coordinates.</p>
	 * @param <p> coor Coordinates of the needed city </p>
	 */
	getWeather(coor: Object){
		this.weatherService.getWeather(coor).subscribe(weath => this.mapToDaily(weath), error => {this.error = true;});
	}

	/**
	 * <p> Maps the returned objects from the weather service to the appropriate objects needed for the html template.</p>
	 * @param weath <p> Array of the returned daily weathers from the service.</p>
	 */
	mapToDaily(weath: Object[]){
		if(weath!=null && weath.length>0)
		{
			this.error = false;
			this.days = weath;
			this.today = weath[0];
			this.days.splice(0, 1);
		}
		else
			this.error = true;
	}

	itemClicked(name:string) {
		//this.citySelected.emit({item: name});
		this.eventService.emitEvent(new EventDataModel({
			sourceTag: this.id,
			data: {city: name},
			source: "weather"
		}));
	}

    /**
	 * <p> This method internationalizes the component.</p>
	 */
    internationalize(locale: string): void {
        if (this.enabledI18N) {
            this.i18nService.setComponentDictionaryURL('/assets/i18n/weather', 'weather')
            .then(() => {
                this.title = this.i18nService.lookup('weather.title', 'weather');
                this.todayLabel = this.i18nService.lookup('weather.todayLabel', 'weather');
                this.cityInput.placeholder = this.i18nService.lookup('weather.placeholder', 'weather');
            });
        }
    }

	/**
	 * <p> Updates the component with the new city provided from the user.</p>
	 */
	updateCity(){
		this.cfWeather.defaultCity = this.cityInput.value;
		this.initCity();
	}
 
	/**
	 * <p> Checks if there are any entries for this component in the event mapping of the event service.</p>
	 * @param inputName <p> The name of the input to match this component. It's weather in this case/</p>
	 */
	checkEventMapping(inputName: string){
		for(let map of this.eventService.mapping)
		{
			if(map.input==inputName && map.inputTag==this.id )
			{
				if(this.eventService.getEvent(map.output)!=null)
				{
					this.subscriptionTags.push(map.outputTag);
					this.subscription.push(this.eventService.getEvent(map.output).subscribe(
						data => {
							if(this.subscriptionTags.indexOf(data.sourceTag)>=0)
							{
								this.settings[map.inputProperty] = data.data[map.outputProperty];
							}
						}));
				}
			}
		}
	}
}
