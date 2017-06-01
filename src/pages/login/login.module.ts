import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { MainMenuPage } from '../main-menu/main-menu';


@NgModule({
  declarations: [
    LoginPage,
    MainMenuPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    IonicPageModule.forChild(MainMenuPage)
  ],
  exports: [
    LoginPage,
    MainMenuPage
  ]
})
export class LoginPageModule {}
