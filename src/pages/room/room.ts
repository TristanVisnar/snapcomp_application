import { Component, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { SelectorRoomPage } from '../selector-room/selector-room';
import { ThemeSelectPage } from '../theme-select/theme-select';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { sessionData } from './room-data';
import { BrowseroomsPage } from '../browserooms/browserooms';
//TIMER
import {ViewChild} from '@angular/core';
import { TimerComponent } from './timer';
import { AlertController } from 'ionic-angular';
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
  public dataItem = new sessionData();

/*
public users: Array<Object>;
public id_teme:number;
public theme:String;
public session_duration: number;
public username_selector: String;
public room_name: String;
public num_of_players:number;
*/

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
  public ROOMINFO;
  public sessionLength:number = 60;
  public time = this.sessionLength;
  //public base64Data:string;
  public staticRoom;
  public firstTime: boolean = true;
  //TIMER
  @ViewChild(TimerComponent) timer: TimerComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public camera: Camera, public http: Http, public json: Jsonp,
              public alertCtrl: AlertController) {
    this.Rdata = this.navParams.get("roomdata");
    this.user1 = this.navParams.get("user1");
    this.sessInfo = this.navParams.get("sessionInfo");
    this.ROOMINFO = this.navParams.get("roominfo");
    this.staticRoom = this.navParams.get("staticRoom");
    //console.log("Ustvari class");
    console.log("Gamemode 0");
    this.startingInfo();

    console.log("Rdata:  " + this.navParams.get("roomdata"));
    console.log("user1:  " +this.navParams.get("user1"));
    console.log("sessInfo:  "+this.navParams.get("sessionInfo"));
    console.log("roominfo:  "+this.navParams.get("roominfo"));
    console.log("staticRoom:  "+this.navParams.get("staticRoom"));


    console.log(this.navCtrl.getActive());

    if(this.navCtrl.getPrevious() != this.staticRoom){
      this.navCtrl.getPrevious()._destroy;
    }

  }

  ionViewDidLoad() {
    /*console.log('ionViewDidLoad RoomPage');
    console.log(this.Rdata);
    console.log(this.user1);
    console.log(this.sessInfo);
    */
    console.log("STRINGS______________________");
    console.log(JSON.stringify(this.Rdata));
    console.log(JSON.stringify(this.user1));
    console.log(JSON.stringify(this.sessInfo));
    this.start();
  }

  leaveSession(){
    this.http.get("http://164.8.230.124/tmp/snapcomp/api.php/rooms/leaveSession/"+this.sessInfo.ID+"/"+this.user1.ID)
    .subscribe(
      result =>
        {
          this.navCtrl.push(BrowseroomsPage, {user1: this.user1})
          //unsub from getdata, nevem kako
        },
      error =>
        {
          let alert = this.alertCtrl.create({
              title: 'Warning!',
              subTitle: 'Unable to leave session, try again later!',
              buttons: ['OK']
          });
          alert.present();
        }
    );
  }

  isSet(obj){
    if(!obj){
      return false;
    }
    return true;
  }

  isSelector(ime){
    if(ime==this.sessInfo.USERNAME_SELECTOR)
      return true;
    return false;
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
        if(data.ROOM_NAME){
          this.dataItem.users = data.USERS;
          this.dataItem.id_teme = data.ID_THEME;
          this.dataItem.theme = data.THEME;
          this.dataItem.session_duration = data.SESSION_DURATION;
          this.dataItem.username_selector = data.USERNAME_SELECTOR;
          this.dataItem.room_name = data.ROOM_NAME;
          this.dataItem.num_of_players = data.Num_Of_Players;
          //console.log("DATA IZPIS"+JSON.stringify(this.dataItem));
        }
    }
    catch(e){
      console.log("error message: data not asigned");
    }
  }
  }

  startingInfo(){
    this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/rooms/sessionData/'+ this.sessInfo.ID +'/')
     .map((res:Response) => res.json()).subscribe(data => {console.log(data);this.assignSessionData(data);})

    this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/timer/getStart/'+ this.sessInfo.ID +'/')
     .map((res:Response) => res.json()).subscribe(data => {this.setTimer(data)});
   }



   enoughPlayers(){
     if(this.dataItem.users && this.dataItem.users.length > 2){
       return true;
     }
     else{
       return false;
     }
   }

   checkEnd(data:any){
      console.log(data);
      if(data.status == "true"){
        console.log("selected");
        this.navCtrl.push(ThemeSelectPage, {roomdata: this.Rdata, user1: this.user1, sessionInfo: this.sessInfo, roominfo: this.ROOMINFO, winningpic: data ,staticRoom : this.staticRoom});
      }else if(data.status == "false"){
        console.log("not selceted");
      }else if(data.status == "error"){
        console.log("error in prepare statement");
      }else{
        console.log("error in calling");
      }
  }



   setTimer(data:any){
     if(data.GAMESTATE==0){
       if(data.TIMEGOING<this.sessionLength){
         if(this.firstTime){
           this.time = data.TIMEGOING;
           this.timer.setTimerRemaingTime(this.sessionLength-data.TIMEGOING)
           this.firstTime = false;
        }
       }
       else{
         console.log("Konec seje slikanja -> seja izbire");
         //this.setNewGamemode();
         this.http.get("http://164.8.230.124/tmp/snapcomp/api.php/rooms/changeGamemode/"+ this.sessInfo.ID+"/1/").subscribe(()=>{
          this.navCtrl.push(SelectorRoomPage, {roomdata: this.Rdata, user1: this.user1, sessionInfo: this.sessInfo, roominfo: this.ROOMINFO ,staticRoom : this.staticRoom});}
        );
       }
     }
     //da te na izbor slik
     else if(data.GAMESTATE == 1){
       this.navCtrl.push(SelectorRoomPage, {roomdata: this.Rdata, user1: this.user1, sessionInfo: this.sessInfo, roominfo: this.ROOMINFO ,staticRoom : this.staticRoom});
     }
     //da te na izbor teme in zmagovalne slike
     else if(data.GAMESTATE == 2){
       this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/images/2/'+ this.sessInfo.ID +'/')
        .map((res:Response) => res.json()).subscribe(data => this.checkEnd(data))
     }
   }



  start(){
    this.getData().subscribe(data => {this.assignSessionData(data)});
    this.checkEndOfSession().subscribe(data => {this.setTimer(data)});
  }

  // Uses http.get() to load a single JSON file
   getData() : Observable<any[]> {
     return Observable.interval(5000).flatMap(() => this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/rooms/sessionData/'+ this.sessInfo.ID +'/')
      .map((res:Response) => res.json())
    );
  }

  checkEndOfSession() : Observable<any[]> {
    return Observable.interval(1000).flatMap(() => this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/timer/getStart/'+ this.sessInfo.ID +'/')
     .map((res:Response) => res.json())
   );
 }

  setStart() { this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/timer/getStart/'+ this.sessInfo.ID +'/')
     .map((res:Response) => res.json())
  ;}




/*
  getData(){
    Observable.interval(5000).flatMap(()=>this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/rooms/sessionData/1/')
     .map((res:Response) => res.json()).subscribe(data => {this.assignSessionData(data)});
   }
*/

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

  finishSession(){
      this.navCtrl.push(SelectorRoomPage, {roomdata: this.Rdata, user1: this.user1, sessionInfo: this.sessInfo, roominfo: this.ROOMINFO , staticRoom : this.staticRoom});
  }
  posljiSliko(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //$input->ID_USER,$input->ID_SESSION,$input->CONTENT,$input->ID_SUGGESTION,$input->longitude,$input->latitude
    var data = JSON.stringify({"ID_USER": this.user1.ID ,"ID_SESSION": this.sessInfo.ID, "CONTENT": this.base64Image , "ID_SUGGESTION": 4, "longitude": 10.12, "latitude": 3.23  });
    this.http.post("http://164.8.230.124/tmp/snapcomp/api.php/images/0/", data , headers)
    .subscribe(
      data=> this.feedback = "Successfully commited",
      error=> this.feedback = "Connection error"
    );
  }

  ngOnInit() {
    setTimeout(() => {
      this.timer.startTimer();
    }, 1000)


  }

  synch(){

  }


}
