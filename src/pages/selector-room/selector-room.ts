import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';


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

  public textPassed: string;
  public slike: Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams ,public http: Http, public json: Jsonp) {
    http.get('http://164.8.230.124/tmp/snapcomp/api.php/images/1/2/')
      .map(response => response.json())
      .subscribe(result => this.slike = result);
    //this.textPassed = navParams.get("testpass");

  }

  isSet(obj){
    if(obj==null || obj== ""){
      return false;
    }
    return true;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectorRoomPage');
  }
}
