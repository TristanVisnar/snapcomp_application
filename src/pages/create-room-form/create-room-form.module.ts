import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateRoomFormPage } from './create-room-form';

@NgModule({
  declarations: [
    CreateRoomFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateRoomFormPage),
  ],
  exports: [
    CreateRoomFormPage
  ]
})
export class CreateRoomFormPageModule {}
