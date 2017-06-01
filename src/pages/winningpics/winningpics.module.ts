import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WinningpicsPage } from './winningpics';

@NgModule({
  declarations: [
    WinningpicsPage,
  ],
  imports: [
    IonicPageModule.forChild(WinningpicsPage),
  ],
  exports: [
    WinningpicsPage
  ]
})
export class WinningpicsPageModule {}
