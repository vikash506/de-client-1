import { Component, OnInit, HostListener } from '@angular/core';
import { Button } from '@models/btn.model';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {

  // @Desc: Listening to screen resize event
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.getScreenSize();
  }

  tabs: Button[] = [
    {name: 'Personal', uri: '/update-info/personal'},
    {name: 'Academic', uri: '/update-info/academic'},
    {name: 'Professional', uri: '/update-info/professional'},
    {name: 'Bank Account', uri: '/update-info/bank-account'},
    {name: 'Declaration', uri: '/update-info/declaration'},
    null,
    {name: 'Dashboard', uri: '/update-info/dashboard'}
  ];

  public isSmallScreen: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.getScreenSize();
  }

  getScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 1000;   // initializing screenWidth
  }

}
