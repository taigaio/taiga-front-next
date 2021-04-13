import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  public get<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        return undefined;
      }
    }
    return undefined;
  }

  public set(key: string, newValue?: {}) {
    localStorage.setItem(
      key,
      JSON.stringify(newValue)
    );
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public contains(key: string) {
    return localStorage.get(key) !== undefined;
  }

  public clear() {
    localStorage.clear();
  }
}
