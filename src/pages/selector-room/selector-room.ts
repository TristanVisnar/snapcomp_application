import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectorRoomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-selector-room',
  templateUrl: 'selector-room.html',
})
export class SelectorRoomPage {

  public textPassed;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.textPassed = navParams.get("testpass");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectorRoomPage');
  }
}
