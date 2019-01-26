import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { User } from './models/user.model';

@Injectable()
export class UserService {

  // http options used for making API calls
  // public httpOptions: any;

  public redirectUrl: string;

  public currentUser: User;

  constructor(private http: HttpClient, private cookieService: CookieService,
    private snackBar: MatSnackBar) {
      // this.updateHeaders();
      if (this.cookieService.check('user') && this.cookieService.check('user')) {
        this.currentUser = new User(JSON.parse(this.cookieService.get('user')));
      }

  }

  public httpOptions() {
    let csrf = this.cookieService.check('csrftoken') ? this.cookieService.get('csrftoken') : '';
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-CSRFToken': csrf })
    };
  }

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    // this.updateHeaders();
    return new Promise<User>((resolve, reject) => {
      this.http.post('/api/users/login/', JSON.stringify(user), this.httpOptions()).subscribe(
        data => {
          this.setUser(data);
          resolve(this.currentUser);
        },
        err => {
          reject(this.errorsUnpack(err['error']));
        }
      );
    });
  }

  signup(userData) {
    // this.updateHeaders();
    return new Promise<User>((resolve, reject) => {
      this.http.post('/api/users/', JSON.stringify(userData), this.httpOptions()).subscribe(
        data => {
          this.setUser(data);
          resolve(this.currentUser);
        },
        err => {
          reject(this.errorsUnpack(err['error']));
        }
      );
    });
  }

  public logout() {
    this.currentUser = null;
    this.cookieService.delete('sessionid');
    this.cookieService.delete('user');
  }

  public isLoggedIn() {
    return this.currentUser != null;
  }

  public setUser(data) {
    this.currentUser = new User(data);
    this.cookieService.set('user', JSON.stringify(this.currentUser));
  }

  private errorsUnpack(errors) {
    if (typeof errors == 'string') {
      return [['', 'Oops, there are some errors. Check logs for more details.']];
    }
    let err = [];
    for (let [key, value] of Object.entries(errors)) {
      let k = '';
      if (key != 'non_field_errors') {
        k = key;
      }
      err.push([k, value]);
    }

    return err;
  }
}
