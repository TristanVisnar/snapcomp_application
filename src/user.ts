export class User
{
  ID: Number;
  ACCNAME: String;
  USERNAME: String;
  NUMOFPOSTS: Number;
  NUMOFWINS: Number;
  ROLE: Number;

  constructor(ID: Number, ACCNAME: String, USERNAME: String,
              NUMOFPOSTS: Number, NUMOFWINS: Number,
              ROLE: Number)
  {
    this.ID = ID;
    this.ACCNAME = ACCNAME;
    this.USERNAME = USERNAME;
    this.NUMOFPOSTS = NUMOFPOSTS;
    this.NUMOFWINS =  NUMOFWINS;
    this.ROLE = ROLE;
  }
}
