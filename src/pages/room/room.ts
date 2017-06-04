import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { SelectorRoomPage } from '../selector-room/selector-room';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';

/**
 * Generated class for the RoomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})


export class sessionData{
  users: Array<Object>;
  id_teme:number;
  theme:String;
  session_duration: number;
  username_selector: String;
  room_name: String;
  num_of_players:number;
}

export class RoomPage {

  public base64Image: string;
  public feedback:Object;
  public sessionID:number;
  public users: Array<Object>;
  public dataItem:sessionData;

  public Rdata;
  public user1;
  public sessInfo;
  //public base64Data:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public http: Http, public json: Jsonp) {
    this.Rdata = this.navParams.get("roomdata");
    this.user1 = this.navParams.get("user1");
    this.sessInfo = this.navParams.get("sessionInfo");
    this.start();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
    console.log(this.Rdata);
    console.log(this.user1);
    console.log(this.sessInfo);
    console.log("STRINGS______________________");
    console.log(JSON.stringify(this.Rdata));
    console.log(JSON.stringify(this.user1));
    console.log(JSON.stringify(this.sessInfo));
  }



  isSet(obj){
    if(obj == null || obj == ""){
      return false;
    }
    return true;
  }

  /*
  users: Array<Object>;
  id_teme:number;
  theme:String;
  session_duration: number;
  username_selector: String;
  room_name: String;
  num_of_players:number;
  */

  assignSessionData(data:any){
    this.dataItem.users = data.USERS;
    this.dataItem.id_teme = data.ID_THEME;
    this.dataItem.theme = data.THEME;
    this.dataItem.session_duration = data.SESSION_DURATION;
    this.dataItem.username_selector = data.USERNAME_SELECTOR;
    this.dataItem.users = data.USERS;
  }

  start(){
    this.getData().subscribe(data => this.assignSessionData(data) );
  }

  // Uses http.get() to load a single JSON file
   getData() : Observable<any[]> {
     return Observable.interval(1000).flatMap(() => this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/rooms/sessionData/1/')
      .map((res:Response) => res.json())
    );
   }


  pic()
  {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then((ImageData) => {
      //this.base64Data = ImageData;
      this.base64Image = ImageData;

      //this.navCtrl.push(RoomPage, {testpass: "data:image/png;base64," + this.base64Image});
    }, (err) => {
      console.log(err);
    });
  }

  posljiSliko(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //$input->ID_USER,$input->ID_SESSION,$input->CONTENT,$input->ID_SUGGESTION,$input->longitude,$input->latitude
    var data = JSON.stringify({"ID_USER": 1 ,"ID_SESSION": 2 , "CONTENT": this.base64Image , "ID_SUGGESTION": 4, "longitude": 10.12, "latitude": 3.23  });
    this.http.post("http://164.8.230.124/tmp/snapcomp/api.php/images/0/", data , headers)
    .subscribe(
      data=> this.feedback = "Successfully commited",
      error=> this.feedback = "Connection error"
    );
  }
}
