import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Injectable()
export class PasswordResetService {
  // http options used for making API calls
  private httpOptions: any;

  // error messages
  public errors: any = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private cookieService: CookieService, private userService: UserService){
    // let csrf = this.cookieService.check("csrftoken") ? this.cookieService.get("csrftoken") : '';
    // this.httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-CSRFToken': csrf })
    // };
  }

resettingPasswd(email){
  return new Promise((resolve, reject) => {
    this.http.post('/api/password_reset/',{'email': email}, this.userService.httpOptions()).subscribe(
      data => {
        resolve(data);
      },
      err => {
        console.log(err);
        this.snackBar.open('Error: The Password reset token cannot be sent. Maybe this email does not exist.', null, {
          duration: 4000,
        });
        reject(this.errorsUnpack(err['error']));
      }
    );
  });
}


setnewPasswd(token, password){
  return new Promise((resolve, reject) => {
    this.http.post('/api/password_reset/confirm/',{'token':token, 'password':password}, this.userService.httpOptions()).subscribe(
      data => {
        resolve(data);
      },
      err => {
        this.snackBar.open('Cannot reset your password. Maybe the server is down or check your token is not expired.', null, {
          duration: 4000,
        });
        reject(this.errorsUnpack(err['error']));
      }
    );
  });
}

private errorsUnpack(errors){
  if(typeof errors == "string")
    return ['', 'Oops, there are some errors. Check logs for more details.'];
  let err = [];
  for (let [key, value] of Object.entries(errors)) {
    let k = '';
    if(key != 'non_field_errors')
      k=key;
    err.push([k, value]);
  }

  return err;
}

}
