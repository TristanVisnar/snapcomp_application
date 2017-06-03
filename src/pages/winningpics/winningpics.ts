import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the WinningpicsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-winningpics',
  templateUrl: 'winningpics.html',
})
export class WinningpicsPage {
  public slike: Array<Object>;
  public results: Array<Object>;
  public index: number = 1;
  public stSlik: number = 15;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http, public json: Jsonp) {
      http.get('http://164.8.230.124/tmp/snapcomp/api.php/images/0/top/1/1/'+this.stSlik+'/')
        .map(response => response.json())
        .subscribe(result => JSON.stringify(this.slike = result));
      this.index += this.stSlik;
    }

  newImages(){

    this.getXImages();
    /*console.log("after getXImages()");
    for(var i=0;i<this.results.length;i++){
      this.slike.push(this.results[i]);
      console.log(i);
    }*/
  }

  getXImages(){
    this.http.get('http://164.8.230.124/tmp/snapcomp/api.php/images/0/top/1/'+this.index+'/'+this.stSlik+'/')
      .map(response => response.json())
      .subscribe(result => {this.results = result;

        console.log("after getXImages()");
        for(var i=0;i<this.results.length;i++){
          this.slike.push(this.results[i]);
          console.log(i);}
        }
      );
    this.index += this.stSlik;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WinningpicsPage');
  }

}
