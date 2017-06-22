import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { CfModule } from 'cedrus-fusion';
import * as COMPONENTS from './components/index';
import * as SERVICES from './services/index';

let COMPONENTS_LIST1: any[] = [];
for(let key in COMPONENTS)
{
  COMPONENTS_LIST1.push(COMPONENTS[key]);
}
export const COMPONENTS_LIST = COMPONENTS_LIST1;

let SERVICES_LIST1: any[] = [];
for(let key in SERVICES)
{
  SERVICES_LIST1.push(SERVICES[key]);
}
export const SERVICES_LIST = SERVICES_LIST1;

@NgModule({
  imports: [ MaterialModule,CfModule,CommonModule],
  declarations: [...COMPONENTS_LIST],
  providers: [...SERVICES_LIST],
  exports: [...COMPONENTS_LIST]
})
export class CfBusinessModule { }
