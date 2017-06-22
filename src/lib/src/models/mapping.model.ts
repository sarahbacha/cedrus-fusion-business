/**
 * <p>Class for defining the mapping between the properties of two models.</p>
 * <p> For example, it is used to define the mapping of an object returned by the news service and our NewsCardModel.</p>
 */
export class MappingModel {

    /**
     * <p> It is the name of the source property to map.</p>
     */
    source: string;

    /**
     * <p> It is the name of the target property that the source is mapped to. </p>
     */
    target: string;

    /**
	 * It is the constructor for the mapping class. It takes the required string values to create the mapping object
	 */
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}

}