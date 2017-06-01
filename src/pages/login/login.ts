import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { RoomPage } from '../room/room';
import { SelectorRoomPage } from '../selector-room/selector-room';
import { WinningpicsPage } from '../winningpics/winningpics';
import { ThemeSelectPage } from '../theme-select/theme-select';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //public base64Image: string;
  loading: Loading;
  regCredentials = { accname: '', pass: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login()
  {
    console.log("0: "+ JSON.stringify(this.regCredentials));
    this.showLoading();
    this.auth.login(this.regCredentials).subscribe(allowed => {
      if(allowed)
      {
        this.navCtrl.setRoot(MainMenuPage);
      }

      else
      {
        this.showError("Wrong Account Name or Password.");
      }

    }, error => {
      this.showError(error);
    });
  }

  public showLoading()
  {
    this.loading = this.loadingCtrl.create({
      content: 'Logging you in...',
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  showError(text)
  {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: "Failed",
      subTitle: text,
      buttons: ['OK']
    });

    alert.present(prompt);
  }

  redirect()
  {
    this.navCtrl.push(MainMenuPage);
  }

  redirect2()
  {
    this.navCtrl.push(RoomPage);
  }

  redirect3()
  {
    this.navCtrl.push(SelectorRoomPage);
  }

  winningPicsPageRedirect()
  {
    this.navCtrl.push(WinningpicsPage);
  }

  redirect4()
  {
    this.navCtrl.push(ThemeSelectPage);
  }
}
