import { Entry } from './browse_entry';

export class EntryList {
  public ENTRIES: Array<Entry>;

  constructor(ENTRIES: Array<Entry>) {
    this.ENTRIES = ENTRIES;
  }

  getEntryList() : Array<Entry> {
    return this.ENTRIES;
  }

  setEntryList(enl : Array<Entry>) {
    this.ENTRIES = enl;
  }

  addEntry(entry: Entry){
    this.ENTRIES.push(entry);
  }
}
