import {Injectable} from '@angular/core';

export class WebStoreAge {
  constructor(private storeAge) {
  }

  get(key: string): any {
    return this.storeAge.getItem(key);
  }

  set(key: string, value: any) {
    this.storeAge.setItem(key, value);
  }
  clear(value: any) {
    this.storeAge.removeItem(value);
  }

}

@Injectable({providedIn: 'root'})
export class LocalStoreAgeService extends WebStoreAge {
  constructor() {
    super(localStorage);
  }
}
