import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import {ThemeSelectPage} from '../theme-select/theme-select';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';

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
  public picChosen:Observable<any>;
  public subs:Subscription = new Subscription();
  public staticRoom;

  constructor(public navCtrl: NavController, public navParams: NavParams ,public http: Http, public json: Jsonp) {
    this.Rdata = this.navParams.get("roomdata");
    this.user1 = this.navParams.get("user1");
    this.sessInfo = this.navParams.get("sessionInfo");
    this.ROOMINFO = this.navParams.get("roominfo");
    this.staticRoom = this.navParams.get("staticRoom");

    console.log("Gamemode 1");

    console.log(this.navCtrl.getActive());


    if(this.navCtrl.getPrevious() != this.staticRoom){
      this.navCtrl.getPrevious()._destroy;
    }

    var url: string;
    url = "http://164.8.230.124/tmp/snapcomp/api.php/images/1/"+this.sessInfo.ID;
    console.log(url);
    this.http.get(url)
      .map(response => response.json())
      .subscribe(result => {
        this.slike = result;
        if(this.slike.length == 0){
          console.log("Ni oddanih slik");
          this.navCtrl.push(ThemeSelectPage, {roomdata: this.Rdata, user1: this.user1, sessionInfo: this.sessInfo, roominfo: this.ROOMINFO, staticRoom : this.staticRoom});
        }
      });
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

  setNewGamemode(){
    this.http.get("http://164.8.230.124/tmp/snapcomp/api.php/rooms/changeGamemode/"+ this.sessInfo.ID+"/2/");
  }

  submitPic(ID){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.setNewGamemode();
    //$input->ID_SESSION,$input->ID_PICTURE
    var data = JSON.stringify({"ID_PICTURE": ID ,"ID_SESSION": this.sessInfo.ID });

    this.http.post("http://164.8.230.124/tmp/snapcomp/api.php/images/1/", data , headers)
    .map(rez => rez.json())
    .subscribe(
      data=> {console.log(data);this.navCtrl.push(ThemeSelectPage, {roomdata: this.Rdata, user1: this.user1, sessionInfo: this.sessInfo, roominfo: this.ROOMINFO, winningpic: data , staticRoom : this.staticRoom})}

      //error=> this.feedback = "Connection error"
    );
  }

  picIsChoosen() : Observable<any[]> {
    return Observable.interval(1000).flatMap(() => this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/images/2/'+ this.sessInfo.ID +'/')
     .map((res:Response) => res.json())
   );
 }


//preverja če je bila slika izbrana
 checkEnd(data:any){
    console.log(data);
    if(data.status == "true"){
      console.log("selected");
      this.navCtrl.push(ThemeSelectPage, {roomdata: this.Rdata, user1: this.user1, sessionInfo: this.sessInfo, roominfo: this.ROOMINFO, winningpic: data , staticRoom : this.staticRoom});
    }else if(data.status == "false"){
      console.log("not selceted");
    }else if(data.status == "error"){
      console.log("error in prepare statement");
    }else{
      console.log("error in calling");
    }
}

  ionViewDidLoad() {
    //this.textPassed = navParams.get("testpass");
    console.log('ionViewDidLoad SelectorRoomPage');
    this.picChosen = this.picIsChoosen()
    this.picChosen.subscribe(data => this.checkEnd(data));
  }
}
