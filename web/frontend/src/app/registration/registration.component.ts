import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  public errorMsg: any[];
  public user = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_conformation: ''
  };

  ngOnInit() {
  }

  submit() {
    if (this.user.password !== this.user.password_conformation) {
      this.errorMsg = [['Password', ' password conformation does not match']];
      return;
    }
    this.userService.signup(this.user).then(() => {
      // let redirect = this.userService.redirectUrl ? this.userService.redirectUrl : '/';
      this.router.navigate(['profile']);
    }, (err) => {
      this.errorMsg = err;
    });
    // .finally(()=>this.showSpinner = false);
  }

}
