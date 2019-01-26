import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { CookieService } from 'ngx-cookie-service';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import {User} from "../core/models/user.model";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public uploader = new FileUploader({
    url: 'api/users/upload_profile_pic/',
    removeAfterUpload: true,
    autoUpload: true,
    allowedFileType: ['image']
  });

  public errorMsg: any[];

  constructor(public _userService: UserService, private cookieService: CookieService, private router: Router) {
    let csrf = this.cookieService.check('csrftoken') ? this.cookieService.get('csrftoken') : '';
    this.uploader.setOptions({headers: [{name: 'X-CSRFToken',  value: csrf}]});
    this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      // refresh user with new profile picture
      this._userService.setUser(JSON.parse(response));
    };
    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      console.log('onErrorItem: picture upload failed', item, status);
    };
  }

  ngOnInit() {}

  createNewProject() {
    this.router.navigate(['/projects/new']);
  }

}
