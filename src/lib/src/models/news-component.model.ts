import { CoreBusinessModel } from './core-business/core-business.model';
/**
 * Class representing the news component model
 */
export class NewsComponentModel extends CoreBusinessModel {
    /**
     * <p> The id of the instance.</p>
     */
    id: string;
    /**
     * <p> The name of the default channel</p>
     */
    defaultChannel:string;
    /**
     * <p> The List of channels that will appear o ntop of the news component.</p>
     */
    channelList: string[]=[];
    /**
     * <p> Set too true to show the channel icons available.</p>
     */
    showChannelList: boolean;
    
    /**
     * <p> Number of news to show per page.</p>
     */
    showItems: number;

    constructor(values: any = {}) {
      super(values);
      this.width="400px";
      this.height = "300px";
      Object.assign(this, values);

      if(this.showItems>0)
      {
        this.height = ((96*this.showItems)+8+this.showItems+1).toString()+"px";
      }
    }
}