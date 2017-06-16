import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { IDropdown } from '../../models/models';
import { DropdownService } from '../../providers/dropdown-service';

@Component({
  // moduleId: module.id,
  selector: 'page-dropdown',
  templateUrl: 'dropdown.html'
})
export class DropdownComponent {
  selector: string;
  group: string;
  dropdowns: IDropdown[];
  // selection: IDropdown[];
  isLoaded: boolean;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public dropdownService: DropdownService) {
    this.selector = navParams.get("selector");
    this.group = navParams.get("group");
    console.log("started DropdownComponent, selector=" + this.selector + ", group=" + this.group);
    if (this.selector) {
      dropdownService.findBySelector(this.selector, this.group).subscribe(dropdowns => {
        console.log("Dropdowns: "+JSON.stringify(dropdowns));
        this.dropdowns = dropdowns;
        this.isLoaded = true;
      });
    }
  }

  save() {
    let selection = [];
    for (let dropdown of this.dropdowns) {
      if (dropdown.enabled) {
        selection.push(dropdown);
      }
    }
    this.viewCtrl.dismiss(selection);
  }

  cancel() {
    this.viewCtrl.dismiss(null);
  }

  unmaskData(data) {
    let unmaskedData = data;
    unmaskedData.number = data.number.replace(/\D+/g, '');
    return unmaskedData;
  }

}
