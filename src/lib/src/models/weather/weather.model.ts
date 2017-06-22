import { CoreModel } from 'cedrus-fusion';

/**
 * Class representing the weather model
 */
export class WeatherModel extends CoreModel {
    /**
     * <p> The name of the city/country. </p>
     */
    name:string;
    /**
     * <p> The description of the weather.</p>
     */
    description: string;
    /**
     * <p> The maximum temperature value.</p>
     */
    max_Temp: string;
    /**
     * <p> The minimum temperature value.</p>
     */
    min_Temp: string;
    /**
     * <p> The url of the image to describe the weather. The url points to src/assets.</p>
     */
    image: string;

    constructor(values: any = {}) {
      super(values);
      Object.assign(this, values);
    }
}
