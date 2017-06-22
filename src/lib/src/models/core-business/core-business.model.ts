import { CoreModel } from 'cedrus-fusion';
import { ToolbarModel } from 'cedrus-fusion';

export class CoreBusinessModel extends CoreModel {

    width: string;
    height: string;
    showToolbar: boolean = true;
    toolbar?: ToolbarModel;

    constructor(values: Object = {}) {
      super(values);
      Object.assign(this, values);
    }
}