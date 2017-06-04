import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import {RoomPage} from "../room/room";

/**
 * Generated class for the BrowseroomsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-browserooms',
  templateUrl: 'browserooms.html',
})

export class BrowseroomsPage {

  public results: Array<Object>;
  public user1;
  public Rdata;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public json: Jsonp)
  {
      this.user1 = navParams.get("user1");
  }

  ionViewDidLoad() {
    this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/rooms/roomsData/0/0')
      .map(response => response.json())
      .subscribe(result => this.results = result);
    console.log('ionViewDidLoad BrowseroomsPage');

  }
  enterRoom(roomID){
    var url: string;
    //console.log(this.user1.ID);
    url = "http://164.8.230.124/tmp/snapcomp/api.php/rooms/sessionViaRoomID/"+roomID;
    //console.log(url);
    this.http.get(url)
      .map(response => response.json())
      .subscribe(result => {
        console.log(result);
        this.Rdata = result.ROOMINFO;
        console.log("BROWSERDIRECT: "+JSON.stringify(result.ROOMINFO));
        this.redirectVroom(result.ROOMINFO);
        },
        Error => console.log("Room creation Error"+Error)
      );
  }
  redirectVroom(sessionInfo){
      //console.log("Redirekting to PAGEROOM");
      //console.log(sessionInfo);
      this.navCtrl.push(RoomPage, {roomdata: this.Rdata, user1: this.user1, sessionInfo: sessionInfo});
  }
  getSessionID(roomID){

  }
}
