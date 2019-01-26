import {Component, OnInit} from '@angular/core';
import {UserService} from '../core/user.service';
import {PasswordResetService} from '../core/password-reset.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  public errorMsg: any[];
  public email: string;

  constructor(private passwordresetService: PasswordResetService,
    public _userService: UserService,
    private router: Router) { }

  ngOnInit() { }

  resetPassw() {
    this.passwordresetService.resettingPasswd(this.email).then(() => {
      this.router.navigate(['/password-confirm/']);
    }, (err) => {
        this.errorMsg = err;
    });
  }

}
