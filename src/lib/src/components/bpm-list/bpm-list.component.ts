import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { CfCoreBusinessComponent } from '../core-business/core-business.component';
import { BpmTaskModel } from '../../models/bpm-task-list/bpm-task.model';
import { BpmTaskListModel } from '../../models/bpm-task-list/bpm-task-list.model';
import { BpmTasksService } from '../../services/bpm-tasks.service';
import { IconModel, ButtonModel, InputModel, ListModel, MapModelsService, IconStylingModel } from 'cedrus-fusion';

@Component({
  selector: 'cf-bpm-list',
  templateUrl: './bpm-list.component.html',
  styleUrls: ['./bpm-list.component.scss'],
  providers: [ BpmTasksService, MapModelsService ]
})
export class CfBpmListComponent extends CfCoreBusinessComponent implements OnInit {
	
	/**
	 * <p>The model that is bound to the template</p>
	 */
	  cfBpmList: BpmTaskListModel;

	  /**
		* <p> It represents the list of settings for the component</p>
		*/
	  @Input()
	  settings: BpmTaskListModel;

	  /**
	 * <p> It contains the lis tof tasks returned from the service.</p>
	 */
	  tasks: any = [];

	/**
	 * <p> The input settings for the input component.</p>
	 */
	  urlInput= new InputModel ({
		type : "text",
		placeholder: " API URL",
		prefix : "",
		width: "90%",
		maxlength : "",
		dividerColor : "green",
		value : "",
		suffix : "",
		hint : {
			text : "",
			align : "end"
		},
		icon: {
			name: "fa-link",
			type: "fa",
			size: "20px",
			color: {
				foreground: "blue",
				background: "transparent"
			}
		},
		iconPosition:"left",
		menu: null
	});

	/**
	 * <p> The input settings for the input component.</p>
	 */
	usernameInput = new InputModel ({
		  type : "text",
		 placeholder: " Username",
		 prefix : "",
		 maxlength : "",
		 dividerColor : "green",
		 value : "",
		 suffix : "",
		 hint : {
			text : "",
			align : "end"
		},
		icon: {
			name: "fa-user",
			type: "fa",
			size: "20px",
			color: {
				foreground: "green",
				background: "transparent"
			}
		},
		  iconPosition:"left",
			menu: null
	});

	/**
	 * <p> The input settings for the input component.</p>
	 */
	passwordInput= new InputModel ({
		type : "password",
		placeholder: " Password",
		prefix : "",
		maxlength : "",
		dividerColor : "blue",
		value : "",
		suffix : "",
		hint : {
			text : "",
			align : "end"
		},
		icon: {
			name: "fa-key",
			type: "fa",
			size: "20px",
			color: {
				foreground: "green",
				background: "transparent"
			}
		},
		iconPosition:"left",
		menu: null
	});

	myList = new ListModel ({
		title: ''
	});

	items= [];

	checkTooltip = {
		message: "Accept",
		position: "left"
	};

	/**
	 * <p> The icon settings for the check button.</p>
	 */
	checkIcon = new IconModel ({
		name: "fa-check-circle-o",
		size: "15px",
	});
	checkIconStyling = new IconStylingModel ({
		icon: {
			class:"checkIcon"
	}
	});
	rejectIconStyling = new IconStylingModel ({
		icon: {
			class:"rejectIcon"
		}
	});
	rejectTooltip = {
		message: "Reject",
		position: "left"
	};

	/**
	 * <p> The icon settings for the reject button.</p>
	 */
  
	rejectIcon = new IconModel ({
		name: "fa-ban",
		size: "15px"
	});

	constructor(public elementRef: ElementRef, private mappingService: MapModelsService, private bpmService: BpmTasksService) {
		super(elementRef);
	}

	ngOnInit() {
		super.ngOnInit();
		this.cfBpmList = this.settings;
		this.mappings = [
				{ source:"assignedToUser", target:"assignedTo" },
				{ source:"bpdName", target:"title" },
				{ source:"taskSubject", target:"subject" },
				{ source:"taskStatus", target:"taskStatus" },
				{ source:"taskDueDate", target:"dueDate" },
				{ source:"taskPriority", target:"priority" },
				{ source:"instanceId", target: "workItemId"},
				{ source:"instanceName", target: "instanceName"},
				{ source:"taskId", target: "taskId"},
				{ source:"taskAssignedTo", target: "team"},
				{ source:"instanceDueDate", target: "instanceDueDate"}
		];
		this.urlInput.value = this.cfBpmList.bpmUrl;
		this.usernameInput.value = this.cfBpmList.username;
		this.passwordInput.value = this.cfBpmList.password;
		this.initializeTasks();
  }

  initializeTasks(){
		this.clearAll();
		this.bpmService.getTasks(this.cfBpmList).subscribe(tsks => this.mapToTaskModel(tsks));
  }

  clearAll(){
		this.tasks = [];
  }

  mapToTaskModel(taskList: Object[]) {
		if(taskList!=null)
		{
			for(let data of taskList)
			{
				let newTask = new BpmTaskModel(this.mappingService.map(data, this.mappings));
				console.log(newTask);
				newTask.subject=  newTask.subject.substring(5);
				newTask.instanceName = newTask.instanceName.split(":")[0];
				newTask.team.who = newTask.team.who.split("_")[0];
				switch(newTask.priority.toLowerCase()){
					case "highest": newTask.priorityIconStyling.icon.class = "highest"; break;
					case "high": newTask.priorityIconStyling.icon.class = "high"; break;
					default: newTask.priorityIconStyling.icon.class = "normal"; break;
				}
				this.tasks.push(newTask);
			}
			if(this.tasks.length>0)
			{
				this.myList.title = this.tasks[0].title;
			}
			this.items=this.tasks;
		}
  }

  getInfo(task: BpmTaskModel) {
		alert(task.title);
  }

  refresh() {
		this.cfBpmList.bpmUrl = this.urlInput.value;
		this.cfBpmList.username = this.usernameInput.value;
		this.cfBpmList.password = this.passwordInput.value;
		this.initializeTasks();
  }

	acceptTask(task: Object){
		this.bpmService.acceptTask(this.cfBpmList,task["taskId"]).subscribe();
		this.initializeTasks();
	}
	rejectTask(task: Object){
		this.bpmService.acceptTask(this.cfBpmList,task["taskId"]).subscribe();
		//this.bpmService.rejectTask(this.cfBpmList,task["taskId"]).subscribe();
		this.initializeTasks();
	}

}
