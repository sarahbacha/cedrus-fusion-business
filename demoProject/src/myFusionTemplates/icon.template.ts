import { IconModel } from 'cedrus-fusion/src/app/models/icon/icon.model';
import { IconStylingModel } from 'cedrus-fusion/src/app/models/icon/icon-styling.model';

// var clickValue = false;
// function click () {
//     clickValue = !clickValue;
// }

export const  myIconTemplate= {
        property: new IconModel({
            display: true,
            name: "thumb_up",
            size: "16px",
            value: "icon"
            // onClick: click.bind(this)
        }),
        style : new IconStylingModel({
            icon: {
                class: "myIcon"
                // dynamicClass:"if click == true ? clickedState: myIcon"
            }
        })
    };