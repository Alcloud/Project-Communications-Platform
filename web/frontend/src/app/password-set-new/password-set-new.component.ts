import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/user.service';
import { PasswordResetService } from '../core/password-reset.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-password-set-new',
  templateUrl: './password-set-new.component.html',
  styleUrls: ['./password-set-new.component.scss']
})
export class PasswordSetNewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    //public userService: UserService,
    private passwordresetService: PasswordResetService,
    public _userService: UserService,
    private router: Router) {
  }

  public errorMsg: any[];
  public password: string;
  public password_confirm: string;
  public token: string;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let token1 = params['token'];

      // this will remove whole whitespace from the string
      function myTrim_all(x) {
        return x.replace(/\s/g,'');
      }

      this.token = myTrim_all(token1);
    });

  }

newPassword(){

  if(this.password!==this.password_confirm){
    this.errorMsg = [['Password',' password conformation does not match']];
    return;
  }

    this.passwordresetService.setnewPasswd(this.token , this.password).then(() => {
    this.router.navigate(['/password-reset-done/']);
    },  (err) => {
      this.errorMsg =err;
    })

 }

}
