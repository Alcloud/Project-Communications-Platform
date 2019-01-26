import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../core/user.service';

@Component({
  selector: 'app-password-confirm',
  templateUrl: './password-confirm.component.html',
  styleUrls: ['./password-confirm.component.scss']
})
export class PasswordConfirmComponent implements OnInit {

  constructor(
    public _userService: UserService, 
    private router: Router) { }

  ngOnInit() {
  }

}
