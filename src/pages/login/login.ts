import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { RoomPage } from '../room/room';
import { SelectorRoomPage } from '../selector-room/selector-room';
import { WinningpicsPage } from '../winningpics/winningpics';
import { ThemeSelectPage } from '../theme-select/theme-select';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../user';


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
  /*public username: String;
  public accname: String;
  public numofwins: Number;
  public numofposts: Number;
  public role: Number;*/
  user1: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

/*  public openPage()
  {
    this.navCtrl.push(SelectorRoomPage);
  }
*/
  public login()
  {
    //var uporJson: String;
    console.log("0: "+ JSON.stringify(this.regCredentials));
    this.auth.login(this.regCredentials).subscribe(result => {
            //return JSON.stringify(result);
            //console.log("SUBSCIRE: "+ JSON.stringify(result));//TU VRNE PODATKE O USERU KI JE LOGINAN
              /*this.accname = result.ACCNAME;
              this.username = result.USERNAME;
              this.numofwins = result.*/

              this.user1 = new User(result.ID, result.ACCNAME, result.USERNAME, result.NUMOFPOSTS, result.NUMOFWINS, result.ROLE);
              this.navCtrl.push(MainMenuPage, {loggedUser: this.user1});
              //{testpass:this.base64Image}
            //this.rerouteTologin(JSON.stringify(result));
            //this.results = "tardedtypescript"; //TEGA NEA SHRANI V PUBLIC RESULTS; AMPAK REZULTAT VRNE
          },
        );
    //console.log("0UPORA: "+uporJson);
    this.showLoading();

    /*.subscribe(allowed => {
      if(allowed)
      {
        console.log("Main menu set");
        this.navCtrl.setRoot(MainMenuPage);
      }

      else
      {
        console.log("Else set");
        this.showError("Wrong Account Name or Password.");
      }

    }, error => {
      this.showError(error);
    });*/
  }

  public showLoading()
  {
    this.loading = this.loadingCtrl.create({
      content: 'Logging you in...',
      dismissOnPageChange: true
    });

    this.loading.present();
  }
  public dismissLoader(){
    this.loading.dismiss();
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
