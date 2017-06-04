import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp } from '@angular/http';
import { AlertController } from 'ionic-angular';
import {RoomPage} from "../room/room";

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http, public alertCtrl: AlertController) {
    this.Rdata = this.navParams.get("roomdata");
    this.user1 = this.navParams.get("user1");
    this.suggestionArray = this.navParams.get("suggArray");
    //console.log("Suggestion array: "+this.suggestionArray);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThemeSelectPage');
  }
  changeSuggestion(newSuggestion){
    this.activeSuggestion = newSuggestion;

    //console.log(this.activeSuggestion);
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
    console.log("USER: "+this.user1.ID);
    if(!(selected === "")){//if nothing is selected then we use typed
      console.log("select je izbran");
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
    console.log(JSON.stringify(jsonString));
    this.http.post(url, JSON.stringify(jsonString))
      .map(response => response.json())
      .subscribe(result => {
            //console.log("RESULTID: "+ JSON.stringify(this.Rdata));
            this.createSession(duration,this.user1.ID,this.Rdata.roomID,result.ID);
            //create session
            //redirect user to room
            //this.navCtrl.push(ThemeSelectPage, {roomdata: this.creationData, suggArray: this.suggArray, user1: this.user1});
        },
        Error => console.log("SessionCreation error"+Error)
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
        Error => console.log("Room creation Error")
      );
  }

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
        Error => console.log("Room creation Error"+Error)
      );
  }

  redirectVroom(sessionInfo){
      //console.log("Redirekting to PAGEROOM");
      //console.log(sessionInfo);
      this.navCtrl.push(RoomPage, {roomdata: this.Rdata, user1: this.user1, sessionInfo: sessionInfo});
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
