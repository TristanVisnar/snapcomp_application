import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

export class sessionData{
  public users: Array<Object>;
  public id_teme:number;
  public theme:String;
  public session_duration: number;
  public username_selector: String;
  public room_name: String;
  public num_of_players:number;
}
