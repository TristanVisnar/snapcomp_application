import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectorRoomPage } from './selector-room';

@NgModule({
  declarations: [
    SelectorRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectorRoomPage),
  ],
  exports: [
    SelectorRoomPage
  ]
})
export class SelectorRoomPageModule {}
