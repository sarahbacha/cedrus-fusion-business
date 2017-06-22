import { StylingModel } from 'cedrus-fusion';
import { CoreStylingModel } from 'cedrus-fusion';
import { ToolbarStylingModel } from 'cedrus-fusion';

export class CoreBusinessStylingModel extends CoreStylingModel {    

    toolbarStyling: ToolbarStylingModel;

	constructor(values: Object = {}) {
        super(values);
		Object.assign(this, values);
        if(this.toolbarStyling==null)
            this.toolbarStyling = new ToolbarStylingModel();
	}
}