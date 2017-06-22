import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CfBusinessModule } from 'cedrus-fusion-business';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, CfBusinessModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
