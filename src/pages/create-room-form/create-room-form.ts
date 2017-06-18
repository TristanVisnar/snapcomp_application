import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomData } from '../../room_data';
import { ThemeSelectPage } from '../theme-select/theme-select';
import { Http, Jsonp } from '@angular/http';
import { Suggestion } from '../suggestion';
/**
 * Generated class for the CreateRoomFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-room-form',
  templateUrl: 'create-room-form.html',
})
export class CreateRoomFormPage {

  public user1;
  public creationData;
  public suggArray: Suggestion[] = [];
  public staticRoom;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.user1 = navParams.get("user1");
    this.staticRoom=this.navParams.get("staticRoom");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateRoomFormPage');
  }

  createRoom(name, idcreator, nsfwroom, privroom, pass)
  {
    console.log(this.user1);
    var jsonString: any;
    jsonString = {
      NAME: name,
      ID_CREATOR: idcreator,
      PRIVATEROOM: privroom,
      NSFWROOM: nsfwroom,
      PASSWORD: pass
    };
    console.log(JSON.stringify(jsonString));
    this.http.post('http://164.8.230.124/tmp/snapcomp/api.php/rooms/createRoom', JSON.stringify(jsonString))
      .map(response => response.json())
      .subscribe(result => {
              this.creationData = new RoomData(result.ID ,name, idcreator, privroom, nsfwroom, pass);
              this.getSuggestionData();
              //this.user1 = new User(result.ID, result.ACCNAME, result.USERNAME, result.NUMOFPOSTS, result.NUMOFWINS, result.ROLE);
              //this.navCtrl.push(ThemeSelectPage, {roomdata: this.creationData});
          },
          Error => console.log("Room coulndt be created: "+Error)
        );
  }
  public zuggzugg: any;
  getSuggestionData(){
      this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/suggestions/dailySuggestions')
        .map(response => response.json())
        .subscribe(result => {
              //console.log(result);
              //console.log("______________________________");
              //var search1: number;
              //search1 = 0;
              for (let sugg of result) {

                  this.zuggzugg = new Suggestion(sugg.ID, sugg.INFO, sugg.SOURCE);
                  //search1 = search1 + 1;
                  //console.log(search1);
                  this.suggArray.push(this.zuggzugg);
              }
              //this.creationData = new RoomData(name, idcreator, privroom, nsfwroom, pass);
              //this.user1 = new User(result.ID, result.ACCNAME, result.USERNAME, result.NUMOFPOSTS, result.NUMOFWINS, result.ROLE);
              //console.log("THe show must stop");
              this.navCtrl.push(ThemeSelectPage, {roomdata: this.creationData, suggArray: this.suggArray, user1: this.user1, staticRoom: this.staticRoom});
          },
          Error => console.log("Suggestion retrieve error")
        );
  }
}
