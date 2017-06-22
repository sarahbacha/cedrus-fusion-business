import { CoreBusinessModel } from '../core-business/core-business.model';
/**
 * Class representing the weather component model
 */
export class WeatherComponentModel extends CoreBusinessModel {
    /**
     * <p> The id of the instance.</p>
     */
    id: string;
    /**
     * <p> The name of the default city to start the component with </p>
     */
    defaultCity:string;

    constructor(values: any = {}) {
      super(values);
      Object.assign(this, values);
      this.width = "290px";
			this.height ="220px";
    }
}