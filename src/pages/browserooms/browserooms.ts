import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the BrowseroomsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-browserooms',
  templateUrl: 'browserooms.html',
})
export class BrowseroomsPage {

  public results: Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public json: Jsonp)
  {
    http.get('http://164.8.230.124/tmp/snapcomp/api.php/rooms/roomData/0/0')
      .map(response => response.json())
      .subscribe(result => this.results = result);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseroomsPage');

  }
}
