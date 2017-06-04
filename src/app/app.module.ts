import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';

import { LoginPage } from '../pages/login/login';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { BrowseroomsPage } from '../pages/browserooms/browserooms';
import { CreateRoomFormPage } from '../pages/create-room-form/create-room-form';
import { RoomPage } from '../pages/room/room';
//import { sessionData } from '../pages/room/room-data';
import { SelectorRoomPage } from '../pages/selector-room/selector-room';
import { WinningpicsPage } from '../pages/winningpics/winningpics';
import { ThemeSelectPage } from '../pages/theme-select/theme-select';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MainMenuPage,
    BrowseroomsPage,
    //sessionData,
    CreateRoomFormPage,
    RoomPage,
    SelectorRoomPage,
    WinningpicsPage,
    ThemeSelectPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MainMenuPage,
    BrowseroomsPage,
    //sessionData,
    CreateRoomFormPage,
    RoomPage,
    SelectorRoomPage,
    WinningpicsPage,
    ThemeSelectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {

}
