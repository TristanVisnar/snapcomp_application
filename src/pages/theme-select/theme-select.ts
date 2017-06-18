import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp } from '@angular/http';
import { AlertController } from 'ionic-angular';
import {RoomPage} from "../room/room";
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ThemeSelectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-theme-select',
  templateUrl: 'theme-select.html',
})
export class ThemeSelectPage {

  public Rdata;
  public user1;
  public SuggestionData;
  public suggestionArray;
  public activeSuggestion;
  public selectionID;
  public winningpic;
  public sessInfo;
  public ROOMINFO;
  public staticRoom;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http, public alertCtrl: AlertController) {
    this.Rdata = this.navParams.get("roomdata");
    this.user1 = this.navParams.get("user1");
    this.sessInfo = this.navParams.get("sessionInfo");
    this.ROOMINFO = this.navParams.get("roominfo");
    this.staticRoom = this.navParams.get("staticRoom");

    console.log("Gamemode 2");

    if(this.navParams.get("suggArray"))
      this.suggestionArray = this.navParams.get("suggArray");
    else{
      console.log("suggArray je nastavljen");
      this.getSuggestionData();
    }
    if(this.navParams.get("winningpic")){
      this.winningpic = this.navParams.get("winningpic");
    }
    //console.log("Suggestion array: "+this.suggestionArray);

    console.log(this.navCtrl.getActive());


    let prev = this.navCtrl.getPrevious();
    if(prev != this.staticRoom){
      console.log("in remove");
    }

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ThemeSelectPage');
  }

  changeSuggestion(newSuggestion){
    this.activeSuggestion = newSuggestion;

    //console.log(this.activeSuggestion);
  }

  isSet(obj){
    if(obj)
      return true;
    return false;
  }

  redirectToRoom(selected, typed, duration){
    var selection: String;
    var userOR: String;
    var selectID: Number;
    if(typed == "" && selected == "") {
      let alert = this.alertCtrl.create({
          title: 'Warning!',
          subTitle: 'You have not selected or typed a suggestion!',
          buttons: ['OK']
      });
      alert.present();
      return;
    }
    //console.log("USER: "+this.user1.ID);
    if(!(selected == "")){//if nothing is selected then we use typed
      //console.log("select je izbran");
      userOR = "1";
      selection = selected.trim();

      //console.log(selection);
      //console.log(selected);
      selectID = this.findIDofSelection(selection);
    }else{//if nothing was typed, then we show error
      userOR="0";
      selectID = this.user1.ID;
      selection = typed;
    }
    //if we havent returned, something has been typed or selected
    var url: string;
    url = "http://164.8.230.124/tmp/snapcomp/api.php/suggestions/insertSuggestion";
    //console.log(url);
    //send data for creation or linking of suggestions
    var jsonString: any;
    jsonString = {
      INFO: selection,
      userOrSugg: userOR,
      ID_POSTER: selectID
    };

    this.http.get("http://164.8.230.124/tmp/snapcomp/api.php/rooms/changeGamemode/"+ this.sessInfo.ID+"/0/").subscribe(()=>{
      this.http.get("http://164.8.230.124/tmp/snapcomp/api.php/timer/setTime/"+ this.sessInfo.ID +"/").subscribe(()=>{
        console.log(JSON.stringify(jsonString));
        this.http.post(url, JSON.stringify(jsonString))
          .map(response => response.json())
          .subscribe(result => {
                //console.log("RESULTID: "+ JSON.stringify(this.Rdata));
                if(this.sessInfo.ID){
                  this.updateSession(duration,this.user1.ID,this.Rdata.roomID,result.ID);
                }
                else{
                  this.createSession(duration,this.user1.ID,this.Rdata.roomID,result.ID);
                }
                //create session
                //redirect user to room
                //this.navCtrl.push(ThemeSelectPage, {roomdata: this.creationData, suggArray: this.suggArray, user1: this.user1});
            },
            Error => console.log("SessionCreation error"+Error)
          );
      });
    });
  }



  themeIsChoosen() : Observable<any[]> {
    return Observable.interval(1000).flatMap(() => this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/isThemeSet/'+ this.sessInfo.ID +'/')
     .map((res:Response) => res.json())
   );
 }


  createSession(duration,idselector,idroom,idsugg){
    var url1: string;
    url1 = "http://164.8.230.124/tmp/snapcomp/api.php/rooms/createSession";
    //SESSION_DURATION, ID_SELECTOR, ID_ROOM, ID_SUGGGESTION
    var jsonString: any;
    jsonString = {
      SESSION_DURATION: duration,
      ID_SELECTOR: idselector,
      ID_ROOM: idroom,
      ID_SUGGESTION: idsugg
    };
    //console.log("JSON LOG1: "+JSON.stringify(jsonString));
    this.http.post(url1, JSON.stringify(jsonString))
      .map(response => response.json())
      .subscribe(result => {
            //USERS, ID_THEME, THEME, SESSION_DURATION,
            //USERNAME_SELECTOR, ID_ROOM, ROOM_NAME, NumOfPlayers
            //console.log("JSON LOG2: "+JSON.stringify(result));
            //console.log(result.ID_THEME);
            this.addUserToSession(result.SESSION_ID);
            //Enter session, SESSIONID, USERID
            //create session
            //redirect user to room
            //this.navCtrl.push(ThemeSelectPage, {roomdata: this.creationData, suggArray: this.suggArray, user1: this.user1});
        },
        Error => console.log("Room creation Error1")
      );
  }

updateSession(duration,idselector,idroom,idsugg){
  var url1: string;
  url1 = "http://164.8.230.124/tmp/snapcomp/api.php/rooms/updateSession";
  //SESSION_DURATION, ID_SELECTOR, ID_ROOM, ID_SUGGGESTION
  var jsonString: any;
  jsonString = {
    SESSION_DURATION: duration,
    ID_SELECTOR: idselector,
    ID_ROOM: idroom,
    ID_SUGGESTION: idsugg
  };

  this.http.post(url1, JSON.stringify(jsonString))
    .map(response => response.json())
    .subscribe(
      data => {if(data.status == "done"){
        console.log(this.sessInfo);
        this.navCtrl.push(RoomPage, {roomdata: this.Rdata, user1: this.user1, roominfo: this.ROOMINFO , sessionInfo: this.sessInfo, staticRoom : this.staticRoom});
      }},
      Error => console.log("Session update Error")
    );
}


//doda igralca v sejo
  addUserToSession(seja){
    var url: string;
    console.log(this.user1.ID);
    url = "http://164.8.230.124/tmp/snapcomp/api.php/rooms/enterSession/"+seja+"/"+this.user1.ID;
    //console.log(url);
    this.http.get(url)
      .map(response => response.json())
      .subscribe(result => {
        //USERS, ID_THEME, THEME, SESSION_DURATION,
        //USERNAME_SELECTOR, ID_ROOM, ROOM_NAME, NumOfPlayers
      //  console.log("REZULT OD ENTERSESSIONA");
        //console.log(result);
        console.log("THEMELOG: "+JSON.stringify(result.ROOMINFO));
        this.redirectVroom(result.ROOMINFO);
        },
        error => console.log("Room creation Error"+error)
      );
  }

  redirectVroom(sessionInfo){
      //console.log("Redirekting to PAGEROOM");
      //console.log(sessionInfo);
      this.navCtrl.push(RoomPage, {roomdata: this.Rdata, user1: this.user1, roominfo: this.ROOMINFO, sessionInfo: sessionInfo, staticRoom : this.staticRoom});
  }

  getSuggestionData(){
      this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/suggestions/dailySuggestions')
        .map(response => response.json())
        .subscribe(data => this.suggestionArray = data,
          error => console.log("Suggestion retrieve error")
        );
  }

  findIDofSelection(selection){
    //console.log("TImmy: "+this.suggestionArray);
    for (let sugg of this.suggestionArray) {
        //console.log(sugg.INFO);
        //console.log(selection);
        if(sugg.INFO.trim() == selection.trim()){
          //console.log("MAJDO MACHO");
          return sugg.ID;
        }
    }
  }
}
