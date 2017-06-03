import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { LoginPage } from '../../pages/login/login';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class User {
  ACCNAME: string;
  USERNAME: string;


  constructor(ACCNAME: string, USERNAME: string)
  {
    this.ACCNAME = ACCNAME;
    this.USERNAME = USERNAME;
  }
}

@Injectable()
export class AuthServiceProvider {

  currentUser: User;
  public results: any;

  constructor(public http: Http,) {
    console.log('Hello AuthServiceProvider Provider');
  }

  /*public rerouteTologin(info){
    this.logpage.dismissLoader();
    console.log("REROUTER: "+ info);
    this.logpage.openPage();
  }*/
  public login(logInfo): Observable<User>
  {

    if(logInfo.accname === "" || logInfo.pass === "")
    {
      console.log("1");
      //return Observable.throw("Empty account name or password.");
      //return "emptyString";
    }

    else
    {
      console.log("2: "+ JSON.stringify(logInfo));

      //console.log("2: "+ logInfo);
      /*return Observable.create(observer => {
        //var response:Response;
        this.http.post('http://164.8.230.124/tmp/snapcomp/api.php/users/', JSON.stringify(logInfo))
          .map(response => response.json())
          //console.log("3: " + JSON.stringify(result)));//this.results = result)
          //console.log("3: " + this.results);
        //let access = (logInfo.PASSWORD ===  && logInfo.ACCNAME === "accname")
        //this.currentUser = new User(this.results[1].toString(),this.results[2].toString());
        //console.log("3: " + this.results.toString());
        //observer.next(access);
        observer.complete();

      });*/
        //console.log(this.results);

        return this.http.post('http://164.8.230.124/tmp/snapcomp/api.php/users/', JSON.stringify(logInfo))
          .map(response => response.json());
    }
  }

  public getUserInfo() : User
  {
    return this.currentUser;
  }

  public logout()
  {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
