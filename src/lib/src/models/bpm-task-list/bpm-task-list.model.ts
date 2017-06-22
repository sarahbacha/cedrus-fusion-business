/**
 * <p>Class representing the BPM Task List Model.</p>
 */
export class BpmTaskListModel {
    /**
     * <p> The url for the BPM api rest Service.</p>
     */
    bpmUrl: string;

    /**
     * <p> The authentication username.</p>
     */
    username: string;

    /**
     * <p> The authentication password.</p>
     */
    password: string;

    /**
     * <p>Sets the width of the component.</p>
     */
    width: string = "500px";

    /**
     * <p>Sets the height of the component.</p>
     */
    height: string = "100%";

    constructor(values: any = {}) {
      Object.assign(this, values);
    }

}