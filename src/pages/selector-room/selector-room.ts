import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';


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

  constructor(public navCtrl: NavController, public navParams: NavParams ,public http: Http, public json: Jsonp) {
    http.get('http://164.8.230.124/tmp/snapcomp/api.php/images/1/2/')
      .map(response => response.json())
      .subscribe(result => this.slike = result);
    //this.textPassed = navParams.get("testpass");

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
    var data = JSON.stringify({"ID_PICTURE": ID ,"ID_SESSION": 2 });

    this.http.post("http://164.8.230.124/tmp/snapcomp/api.php/images/1/", data , headers)
    .subscribe(
      data=> this.feedback = JSON.stringify(data)
      //error=> this.feedback = "Connection error"
    );
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectorRoomPage');
  }
}
