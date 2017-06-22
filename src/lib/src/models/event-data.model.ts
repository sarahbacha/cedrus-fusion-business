export class EventDataModel {
    /**
     * <p> Holds the data of the event emitted.</p>
     */
    data: any;

    /**
     * <p> Holds the name of the source that emitted the event.</p>
     */
    source: string;

    /**
     * <p> the tage of the source component in case of multiple instances. </p>
     */
    sourceTag: string;

	/**
	 * It is the constructor for the EventDataModel
	 */
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}   
}
