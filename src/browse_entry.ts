export class Entry {
  public IMAGE: String;
  public LIKES: Number;
  public DISLIKES: Number;
  public THEME: String;
  public USERNAME: String;

  constructor(IMAGE: String, LIKES: Number,
              DISLIKES: Number, THEME: String,
              USERNAME: String)
  {
    this.IMAGE = IMAGE;
    this.LIKES = LIKES;
    this.DISLIKES = DISLIKES;
    this.THEME = THEME;
    this.USERNAME = USERNAME;
  }
}
