import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/user.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-password-reset-done',
  templateUrl: './password-reset-done.component.html',
  styleUrls: ['./password-reset-done.component.scss']
})
export class PasswordResetDoneComponent implements OnInit {
  public errorMsg: any[];

  public user: any;


  constructor(
    public _userService: UserService, 
    private router: Router) { }

  ngOnInit() {
  }

}
