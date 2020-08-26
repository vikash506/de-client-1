import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private loggedIn: boolean;
  localStorage;
  private loginSubject = new Subject<boolean>();
  constructor(
    private window: Window
  ) {
    this.localStorage = this.window.localStorage
    this.isAlreadyLoggedIn();
  }

  isAlreadyLoggedIn(): boolean {
    this.loggedIn = this.localStorage.getItem('mobile') != null;
    this.loginSubject.next(this.loggedIn);
    return this.loggedIn;
  }

  setLocalStorage(key: string, value: string): void {
    this.localStorage.setItem(key, value);
    this.loggedIn = true;
    this.loginSubject.next(this.loggedIn);
  }

  getLoginStatusObservable(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  getLocalStorage(key: string): string {
    return this.localStorage.getItem(key);
  }

  logout(): void {
    this.localStorage.clear();
    this.loggedIn = false;
    this.loginSubject.next(this.loggedIn);
  }

  generateHeaderObject(): Object {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "authorization": this.localStorage.getItem("token")
    })
    let options = { headers: headers }
    return options;
  }

}
