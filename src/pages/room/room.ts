import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { SelectorRoomPage } from '../selector-room/selector-room';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';

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
  //public base64Data:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public http: Http, public json: Jsonp) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }

  isSet(obj){
    if(obj == null || obj == ""){
      return false;
    }
    return true;
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
