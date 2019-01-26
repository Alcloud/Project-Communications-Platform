import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';


@Injectable()
export class ChatService {

  // http options used for making API calls
  private httpOptions: any;

  // error messages
  public errors: any = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar,
              private cookieService: CookieService, private userService: UserService) {
    // let csrf = this.cookieService.check('csrftoken') ? this.cookieService.get('csrftoken') : '';
    // this.httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json',
    //     'X-CSRFToken': csrf,
    //     // 'Authorization': 'JWT ' + userService.token
    //   })
    // };
  }

  public getMessages(chat_id: string, last_msg_id: number = 0){
    return new Promise((resolve, reject) => {
      this.http.get('/api/chats/' + chat_id + '/messages/?last_id=' + last_msg_id, this.userService.httpOptions()).subscribe(
      (messages) => {
          resolve(messages);
        },
        err => {
          console.log(err['error']);
          this.snackBar.open('Error: messages could not be loaded', null, {
            duration: 4000,
          });
          reject(err['error']);
        }
      );
    });
  }

  public getChats(project_id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('/api/projects/' + project_id + '/chats/', this.userService.httpOptions()).subscribe(
      (chats) => {
          resolve(chats);
        },
        err => {
          console.log(err['error']);
          this.snackBar.open('Error: chats list could not be loaded', null, {
            duration: 4000,
          });
          reject(err['error']);
        }
      );
    });
  }

  public createGroupChat(title: String, project_id: number, ids: number[]) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/chats/', {private: false, users: ids, title: title, project_id: project_id}, this.userService.httpOptions()).subscribe(
      (chat) => {
          resolve(chat);
        },
        err => {
          console.log(err['error']);
          this.snackBar.open('Error: chats could not be open', null, {
            duration: 4000,
          });
          reject(err['error']);
        }
      );
    });
  }

  public createOrGetPrivateChat(user_id: number, project_id: number){
    return new Promise((resolve, reject) => {
      this.http.post('/api/chats/', {private: true, users: [user_id], project_id: project_id}, this.userService.httpOptions()).subscribe(
      (chat) => {
          resolve(chat);
        },
        err => {
          console.log(err['error']);
          this.snackBar.open('Error: chats could not be open', null, {
            duration: 4000,
          });
          reject(err['error']);
        }
      );
    });
  }

  public getChat(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('/api/chats/' + id, this.userService.httpOptions()).subscribe(
      (chat) => {
          resolve(chat);
        },
        err => {
          console.log(err['error']);
          this.snackBar.open('Error: chats list could not be loaded', null, {
            duration: 4000,
          });
          reject(err['error']);
        }
      );
    });
  }

  public sendMessage(chat_id: number, text: string) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/chats/' + chat_id + '/messages/', {text: text}, this.userService.httpOptions()).subscribe(message => {
        resolve(message);
        // this.snackBar.open('Comment added', null, {
        //   duration: 4000,
        // });
      },
      err => {
        this.snackBar.open('Error: message could not be sent', null, {
          duration: 4000,
        });
        reject(err['error']);
    });
    });
  }

  public deleteMessage(chat_id: number, message_id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete('/api/messages/' + message_id + '/', this.userService.httpOptions()).subscribe(message => {
        resolve(message_id);
        // this.snackBar.open('Comment added', null, {
        //   duration: 4000,
        // });
      },
      err => {
        this.snackBar.open('Error: message could not be deleted', null, {
          duration: 4000,
        });
        reject(err['error']);
    });
    });
  }

  public createChatt(project: any) {
    let promise = new Promise((resolve, reject) => {
      this.http.post('/api/chats', JSON.stringify(project), this.userService.httpOptions()).subscribe(
        chat_id => {
          resolve(chat_id);
        },
        err => {
          this.snackBar.open('Error: chat could not be created', null, {
            duration: 4000,
          });
          reject(err['error']);
        }
      );
    });

    return promise;
  }

  private errorsUnpack(errors) {
    if (typeof errors == 'string') {
      return ['', 'Oops, there are some errors. Check logs for more details.']
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
