import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp } from '@angular/http';
import { AlertController } from 'ionic-angular';

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
    this.activeSuggestion = "Test";
    this.Rdata = this.navParams.get("roomdata");
    this.user1 = this.navParams.get("user1");
    this.suggestionArray = this.navParams.get("suggArray");
    console.log(this.suggestionArray);
    console.log(this.activeSuggestion);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThemeSelectPage');
  }
  changeSuggestion(newSuggestion){
    this.activeSuggestion = newSuggestion;

    console.log(this.activeSuggestion);
  }
  redirectToRoom(selected, typed){
    var selection: String;
    selection = selected;
    var userOR: String;
    userOR = "1";
    var selectID: Number;
    selectID = this.findIDofSelection(selection);
    if(selected === ""){//if nothing is selected then we use typed
      console.log("select je prazen");
      userOR = "0";
      selectID = this.user1.ID;
      selection = typed;
    }else if(typed === ""){//if nothing was typed, then we show error
      console.log("typed je prazen");
      let alert = this.alertCtrl.create({
          title: 'Warning!',
          subTitle: 'You have not selected or typed a suggestion!',
          buttons: ['OK']
      });
      alert.present();

      return;
    }
    //if we havent returned, something has been typed or selected
    var url: String;
    url = "http://164.8.230.124/tmp/snapcomp/api.php/suggestions/dailySuggestions/"+selection+"/"+userOR+"/"+selectID;
    this.http.get('url')
      .map(response => response.json())
      .subscribe(result => {
            //this.navCtrl.push(ThemeSelectPage, {roomdata: this.creationData, suggArray: this.suggArray, user1: this.user1});
        },
        Error => console.log("Room creation Error")
      );
  }
  redirectVroom(){

  }
  findIDofSelection(selection): Number{
    for (let sugg of this.suggestionArray) {
        if(sugg.INFO === selection){
          return sugg.ID;
        }
    }
  }
}
