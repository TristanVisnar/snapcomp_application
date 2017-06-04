import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrowseroomsPage } from '../browserooms/browserooms';
import { CreateRoomFormPage } from '../create-room-form/create-room-form';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
/**
 * Generated class for the MainMenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {

  //username = '';
  //accname = '';
  public logUser;



  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider) {
  /*  let info = this.auth.getUserInfo();
    this.username = info['USERNAME'];
    this.accname = info['ACCNAME'];*/
    this.logUser = navParams.get("loggedUser");
  }

/*  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainMenuPage');
  }

  redirectBrowse()
  {
    this.navCtrl.push(BrowseroomsPage, {user1: this.logUser});
  }

  redirectCreate()
  {
    this.navCtrl.push(CreateRoomFormPage, {user1: this.logUser});
  }
}
