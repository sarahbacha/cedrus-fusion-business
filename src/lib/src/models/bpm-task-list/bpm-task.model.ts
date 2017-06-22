import { IconStylingModel } from 'cedrus-fusion';
import { IconModel } from 'cedrus-fusion';
/**
 * <p>Class representing the BPM Task Model.</p>
 */
export class BpmTaskModel {
    /**
     * <p> The person/Group assigned to the task.</p>
     */
    assignedTo: string;
    /**
     * <p> The main title of the instance.</p>
     */
    title: string;
    /**
     * <p> The subject of the task.</p>
     */
    subject: string;
    /**
     * <p> The status of the instance</p> 
     * <p> For example: Active </p>
     */
    taskStatus: string;
    /**
     * <p> The due date of the task/</p>
     */
    dueDate: string;
    /**
     * <p> The priority of the task.</p>
     */
    priority: string;

    /**
     * <p> Task ID </p>
     */
    workItemId: string;

    instanceName: string;

    team: any;

    instanceDueDate: string;

    taskId: string;


    priorityIconStyling: IconStylingModel;
    priorityIcon: IconModel;

    constructor(values: any = {}) {
      Object.assign(this, values);

      this.priorityIcon = new IconModel({
        name: "fa-square",
        size: "12px"
      });

      this.priorityIconStyling = new IconStylingModel();

    }

}