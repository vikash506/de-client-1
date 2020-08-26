import { Component, OnInit } from '@angular/core';

import { LoginService } from '@services/login/login.service';
import { LocalstorageService } from '@services/localstorage/localstorage.service';
import { NavigatorService } from '@services/navigation/navigator.service';
import { User } from '@models/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // @Desc: Title for the Form
  // @Access: Public
  title: string = 'Login Form';
  public errMobile: string = '';

  constructor(
    private loginService: LoginService,
    private localStorageService: LocalstorageService,
    private navigationService: NavigatorService
  ) { }

  ngOnInit(): void {
    this.nav();
  }
  
  // @Desc: Check if already logged in and redirect accordingly
  nav(): void {
    if(this.localStorageService.isAlreadyLoggedIn()){
      this.navigationService.navigate('/update-info');
    }
  }

  // @Desc: login if not already
  login(userFormValue) {
    this.loginService.loginUser(userFormValue)
      .subscribe(d => {
        if (d.data.length > 0) {
          this.localStorageService.setLocalStorage('token', d.data);
          this.localStorageService.setLocalStorage('mobile', userFormValue.mobile);
          this.navigationService.navigate('/update-info');
        }
      },
      err => {
        console.log(JSON.stringify(err.error))
      }
      )
  }

  checkError(m) {
    if(m.errors?.required) {
      this.errMobile = "Mobile number is required"
    }
    else if(m.errors?.pattern) {
      this.errMobile = "It should contain numbers only."
    }
    else if(m.errors?.minlength && m.errors?.minlength.actualLength < m.errors?.minlength.requiredLength){
      this.errMobile = `10 characters are required | ${m.errors?.minlength.actualLength} / ${m.errors?.minlength.requiredLength}`
    }
    else {
      this.errMobile = '';
    }
  }

}
