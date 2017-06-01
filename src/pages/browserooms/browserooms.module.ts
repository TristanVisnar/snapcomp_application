import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseroomsPage } from './browserooms';

@NgModule({
  declarations: [
    BrowseroomsPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowseroomsPage),
  ],
  exports: [
    BrowseroomsPage
  ]
})
export class BrowseroomsPageModule {}
