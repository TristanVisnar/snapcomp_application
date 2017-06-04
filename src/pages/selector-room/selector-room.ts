import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import {ThemeSelectPage} from '../theme-select/theme-select';


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

  public feedback:string;
  public textPassed: string;
  public slike: Array<Object>;
  public Rdata;
  public user1;
  public sessInfo;
  public ROOMINFO;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public http: Http, public json: Jsonp) {
    this.Rdata = this.navParams.get("roomdata");
    this.user1 = this.navParams.get("user1");
    this.sessInfo = this.navParams.get("sessionInfo");
    this.ROOMINFO = this.navParams.get("roominfo");
    var url: string;
    url = "http://164.8.230.124/tmp/snapcomp/api.php/images/1/"+this.sessInfo.ID;
    console.log(url);
    this.http.get(url)
      .map(response => response.json())
      .subscribe(result => this.slike = result);
    //console.log(this.Rdata);
  //  console.log(this.user1);

  //  console.log("SESSION INFO: "+JSON.stringify(this.sessInfo));
  //  console.log("ROOM INFO: "+JSON.stringify(this.ROOMINFO));
                                                      //1, session number

    /*http.get('http://164.8.230.124/tmp/snapcomp/api.php/images/1/2/')
      .map(response => response.json())
      .subscribe(result => this.slike = result);
    this.textPassed = navParams.get("testpass");*/
  }

  isSet(obj){
    if(obj==null || obj== ""){
      return false;
    }
    return true;
  }

  setFocus(obj){
  }

  submitPic(ID){
    let headers = new Headers({ 'Content-Type': 'application/json' });

    //$input->ID_SESSION,$input->ID_PICTURE
    var data = JSON.stringify({"ID_PICTURE": ID ,"ID_SESSION": this.sessInfo.ID });

    this.http.post("http://164.8.230.124/tmp/snapcomp/api.php/images/1/", data , headers)
    .map(rez => rez.json())
    .subscribe(
      data=> {console.log(data);this.navCtrl.push(ThemeSelectPage, {roomdata: this.Rdata, user1: this.user1, sessionInfo: this.sessInfo, roominfo: this.ROOMINFO, winningpic: data})}

      //error=> this.feedback = "Connection error"
    );
  }




  ionViewDidLoad() {
    //this.textPassed = navParams.get("testpass");
    console.log('ionViewDidLoad SelectorRoomPage');
  }
}
