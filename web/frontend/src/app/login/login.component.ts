import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/user.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public showSpinner = false;
  public errorMsg: any[];

  public user: any;
  public mode: String;

  constructor(public _userService: UserService, private router: Router) { }

  ngOnInit() {
    this.errorMsg = [];
    this.user = {
      username: '',
      password: ''
    };
}
  login() {
    this.mode = 'indeterminate';
    this._userService.login({'username': this.user.username, 'password': this.user.password}).then(() => {
      const redirect = this._userService.redirectUrl ? this._userService.redirectUrl : '/';
      this.router.navigate([redirect]);
     
    }, (err) => {
      this.errorMsg = err;
    }).finally(() => this.mode = 'determinate');
  }

  logout() {
    this._userService.logout();
  }

}
