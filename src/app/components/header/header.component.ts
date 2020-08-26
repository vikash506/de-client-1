import { Component, OnInit, HostListener, ViewChild } from '@angular/core';

import { LocalstorageService } from '@services/localstorage/localstorage.service';
import { NavigatorService } from '@services/navigation/navigator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public loggedIn: boolean;
  public isSmallScreen;    // screenWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.getScreenSize();
  }
  constructor(
    private localStorageService: LocalstorageService,
    private navigator: NavigatorService,
  ) { }

  ngOnInit(): void {
    this.getScreenSize();
    this.getLoginStatus();
  }

  // @Desc: Fetching screen size to ensure responsiveness
  // @From winodw object
  getScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 1000;
  }

  // @Desc: Fetching LoginStatus
  // @From: LocalStorageService
  getLoginStatus(): void {
    if (this.localStorageService.isAlreadyLoggedIn()) {
      this.loggedIn = true;
    }
    this.localStorageService.getLoginStatusObservable()
      .subscribe(b => this.loggedIn = b);
  }

  // @Desc: Logging out
  logout() {
    if (this.localStorageService.isAlreadyLoggedIn()) {
      this.localStorageService.logout();
    }
    else {
      this.navigator.navigate('/login');
    }
  }
}
