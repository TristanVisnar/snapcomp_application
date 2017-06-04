import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { SelectorRoomPage } from '../selector-room/selector-room';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { sessionData } from './room-data';

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



export class RoomPage {

  public base64Image: string;
  public feedback:Object;
  public sessionID:number;
  public users: Array<Object>;
  public dataItem:sessionData;
  /*public dataItem:{
    users: Array<JSON>,
    id_teme:number,
    theme:String,
    session_duration: number,
    username_selector: String,
    room_name: String,
    num_of_players:number,
  };
*/
  public Rdata;
  public user1;
  public sessInfo;
  //public base64Data:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public http: Http, public json: Jsonp) {
    this.Rdata = this.navParams.get("roomdata");
    this.user1 = this.navParams.get("user1");
    this.sessInfo = this.navParams.get("sessionInfo");
    this.dataItem = new sessionData();
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
    if(data){
      try{
    this.dataItem.users = data.USERS;
    this.dataItem.id_teme = data.ID_THEME;
    this.dataItem.theme = data.THEME;
    this.dataItem.session_duration = data.SESSION_DURATION;
    this.dataItem.username_selector = data.USERNAME_SELECTOR;
    this.dataItem.room_name = data.ROOM_NAME;
    this.dataItem.num_of_players = data.Num_Of_Players;
    console.log(JSON.stringify(this.dataItem));
    }
    catch(e){
      console.log("error message: data not asigned");
    }
  }
  }

  start(){
    this.getData().subscribe(data => {this.assignSessionData(data)}
   );
  }

  // Uses http.get() to load a single JSON file
   getData() : Observable<any[]> {
     return Observable.interval(5000).flatMap(() => this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/rooms/sessionData/1/')
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
