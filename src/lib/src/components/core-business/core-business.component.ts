import { Component, OnInit, Input, Output, EventEmitter, ElementRef, OnDestroy, ContentChild, ViewChild, TemplateRef } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { CfCoreComponent, IconModel, ButtonModel,IconStylingModel, ButtonStylingModel, ToolbarModel, CfComponentTemplateService } from 'cedrus-fusion';
import { MappingModel } from '../../models/mapping.model';
import { CoreBusinessModel } from '../../models/core-business/core-business.model';
import { CoreBusinessStylingModel } from '../../models/core-business/core-business-styling.model';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'cf-core-business2',
  templateUrl: './core-business.component.html',
  styleUrls: ['./core-business.component.scss']
})
export class CfCoreBusinessComponent extends CfCoreComponent implements OnInit, OnDestroy {
  
  /**
   * <p>Reference to the MdSidenav in CfCoreBusinessComponent.</p>
   * <p>It uses cfComponentSidenavTemplate View Container inside it to show custom templates.</p>
   */
  @ViewChild('cfComponentSidenav', { read: MdSidenav }) cfComponentSidenav: MdSidenav;

  /**
   * <p>View Container reference used inside CfCoreBusinessComponent MdSidenav.</p>
   */
  @ContentChild('cfComponentSidenavTemplate') cfComponentSidenavTemplate;

  /**
   * <p> Output event triggered when the mouse is double clicked.</p>
   */
  @Output()
  onDoubleClick = new EventEmitter();

  /**
   * <p> Output event triggered when the mouse enters the component.</p>
   */
  @Output()
  onMouseEnter= new EventEmitter();

  /**
   * <p> Output event triggered when the mouse leaves the component.</p>
   */
  @Output()
  onMouseLeave= new EventEmitter();

  /**
   * <p> An array of the events the component is subscribed to.</p>
   */
  subscription: Subscription[];

  /**
   * <p> An array of mappings model to map the object returned from the news service to the NewsCardModel.</p>
   */
  mappings: MappingModel[];

  constructor(public elementRef: ElementRef) {
    super(elementRef);
  }

ngOnInit() {
      super.ngOnInit();
      this.buttonStyling = new ButtonStylingModel ({
        button:{
          class:"whiteButton"
        }
      });

      this.iconStyling = new IconStylingModel ({
        icon:{
          class:"whiteIcon",
          dynamicClass:"icons"
        }
      });
      this.settingsIcon = new IconModel ({
        name: "more_vert",
        type: "mi",
        size: "20px",
      });
      if(this.styling==null)
        this.styling = new CoreBusinessStylingModel();
}
  
/**
 * <p> Called when the component is destroyed.</p>
 */
ngOnDestroy() {
		// prevent memory leak when component destroyed
    if(this.subscription!=null && this.subscription.length>0)
      for(let sub of this.subscription)
        sub.unsubscribe();
	}

  /**
   * <p> Bind this method to the double click event in any business component to emit one</p>
   */
  doubleClick(){
    this.onDoubleClick.emit();
  }

  /**
   * <p> Bind this method to the mouse enter event in any business component to emit one</p>
   */
  mouseEnter(){
    this.onMouseEnter.emit();
  }

  /**
   * <p> Bind this method to the mouse leave event in any business component to emit one</p>
   */
  mouseLeave(){
    this.onMouseLeave.emit();
  }

  @ContentChild('cfComponent') cfComponent;
  @ContentChild('cfSettings') cfSettings;
  @ContentChild('cfErrors') cfErrors;

  mode:string = "expand";
  previousMode: string = "expand";

  buttonStyling: ButtonStylingModel;

  iconStyling: IconStylingModel;

/**
 * Title Bar Section
 */

 @Input()
 title: string;

 @Input()
 properties:CoreBusinessModel;
 @Input()
 styling:CoreBusinessStylingModel;

  settingsIcon: IconModel;

	/**
	 * <p> The button settings for the Cancel button/</p>
	 */
  cancelButton= new ButtonModel ({
		label: "Cancel"
	});
	/**
	 * <p> The button settings for the Done button/</p>
	 */
  doneButton = new ButtonModel ({
		label: "Done"
	});

  private isCollapsed = false;
  
  toggle(){
    if(this.mode!="minimize")
    {
      this.previousMode = this.mode;
      this.mode = "minimize";
      this.elementRef.nativeElement.parentElement.style.bottom = 'auto';
      this.isCollapsed = true;
    }
    else
    {
      this.mode = this.previousMode;
      this.isCollapsed = false;
      this.elementRef.nativeElement.parentElement.style.bottom = this.isMaximized ? '-75px' : 'auto';
    }
  }

  private prevLeft = ''; 
  private prevTop = ''; 
  private isMaximized = false;

  maximize(event) {
    if(event) {
      this.prevLeft = this.elementRef.nativeElement.parentElement.style.left;
      this.prevTop = this.elementRef.nativeElement.parentElement.style.top;
      
      this.elementRef.nativeElement.parentElement.style.top = '-75px';
      this.elementRef.nativeElement.parentElement.style.right = '0px';
      this.elementRef.nativeElement.parentElement.style.bottom = this.isCollapsed ? 'auto' : '-75px';
      this.elementRef.nativeElement.parentElement.style.left = '0px';
      this.elementRef.nativeElement.parentElement.style.zIndex = '100000';

    } else {
      this.elementRef.nativeElement.parentElement.style.top = this.prevTop;
      this.elementRef.nativeElement.parentElement.style.right = 'auto';
      this.elementRef.nativeElement.parentElement.style.bottom = 'auto';
      this.elementRef.nativeElement.parentElement.style.left = this.prevLeft;
      this.elementRef.nativeElement.parentElement.style.zIndex = '0';     
    }

    this.isMaximized = event;
  }


  /********************** End TitleBar Section ******************************/

  /**
   * Settings Page Section
   */

  /**
   * <p>Allow the user to change the settings of the component.</p>
   * <p> It is true by default.</p>
   */
  @Input()
  allowSettingsEdit: boolean = true;

	/**
	 * <p> Toggle to show the settings of the component.</p>
	 */
	settingsValue:boolean = false;

  /**
   * <p>Show the settings page</p>
   */
  viewSettings() {
    this.previousMode = this.mode;
    this.mode = "settings";
  }

  @Output()
  updateSettings = new EventEmitter();

  cancel() {
    if(this.errorValue==true)
      this.mode = "error";
    else
      this.mode = "expand";
  }

  done(){
    if(this.errorValue==true)
      this.mode = "error";
    else
    {
      this.mode = "expand";
    }
    this.updateSettings.emit();
  }

  /********************** End Settings Section ******************************/

  /**
   * Error Page Section
   */

	errorValue: boolean = true;

	@Input()
	get error() {
		return this.errorValue;
	}
	@Output()
	errorChange = new EventEmitter();

	set error(val) {
		this.errorValue = val;
    if(this.mode!="settings")
    {
      if(this.errorValue==true)
      {
        this.mode = "error";
      }
      else
      {
        this.mode="expand";
      }
    }
		this.errorChange.emit(this.errorValue);
	}

  /**
	 * <p> The icon settings for the error icon.</p>
	 */
  errorIcon = new IconModel ({
		name: "error",
		type: "mi",
		size: "30px"
	});

	/**
	 * <p> The button settings for the Refresh button/</p>
	 */
  refreshButton = new ButtonModel ({
		label: "Refresh"
	});

  @Output()
  onRefresh = new EventEmitter();

  refresh(){
    this.onRefresh.emit();
  }

  /********************** End Error Section ******************************/
}
