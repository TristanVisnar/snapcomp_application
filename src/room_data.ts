export class RoomData {
  //public USERNAME: String;
  public roomID: Number;
  public ROOM_NAME: String;
  public ID_CREATOR: Number;
  public privroom: Number;
  public pass: String;
  //public STATE: Number;
  public nsfwroom: Number;

  constructor(/*USERNAME: String,*/roomID: Number, roomname: String, ID_CREATOR: Number, privroom: Number, nsfwroom: Number, pass: String/*STATE: Number*/) {
    //this.USERNAME = USERNAME;
    //this.STATE = STATE;
    this.roomID = roomID;
    this.ROOM_NAME = roomname;
    this.ID_CREATOR = ID_CREATOR;
    this.privroom = privroom;
    this.nsfwroom = nsfwroom;
    this.pass = pass;
  }
}
