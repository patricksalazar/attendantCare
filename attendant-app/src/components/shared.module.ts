import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextMaskModule } from 'angular2-text-mask';

import { DropdownComponent } from './dropdown/dropdown.component';
import { ErrorMessagesComponent } from './errors/error-messages.component';
import { PhoneComponent } from './phone/phone.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    DropdownComponent,
    ErrorMessagesComponent,
    PhoneComponent,
    ContactComponent
  ],
  imports: [
    IonicPageModule.forChild(DropdownComponent),
    TextMaskModule
  ],
  exports: [
    DropdownComponent,
    ErrorMessagesComponent,
    PhoneComponent,
    ContactComponent
  ]
})
export class SharedModule {}
