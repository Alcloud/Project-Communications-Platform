import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Project } from './models/project.model';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';


@Injectable()
export class ProjectService {

  // http options used for making API calls
  private httpOptions: any;

  // error messages
  public errors: any = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private cookieService: CookieService, private userService: UserService) {
    // let csrf = this.cookieService.check('csrftoken') ? this.cookieService.get('csrftoken') : '';
    // this.httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-CSRFToken': csrf })
    // };
  }

  getProject(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('/api/projects/' + id, this.userService.httpOptions()).subscribe(
      (project) => {
          resolve(project);
        },
        err => {
          console.log(err['error']);
          this.snackBar.open('Error: project could not be loaded', null, {
            duration: 4000,
          });
          reject(err['error']);
        }
      );
    });
  }

  getProjects() {
    return new Promise((resolve, reject) => {
      this.http.get('/api/projects/', this.userService.httpOptions()).subscribe(
      (projects) => {
          resolve(projects);
        },
        err => {
          console.log(err['error']);
          this.snackBar.open('Error: projects list could not be loaded', null, {
            duration: 4000,
          });
          reject(err['error']);
        }
      );
    });
  }

  getProjectMessages(project_id: number) {
    return new Promise((resolve, reject) => {
      this.http.get('/api/project_messages/' + project_id, this.userService.httpOptions()).subscribe(
      (messages) => {
          resolve(messages);
        },
        err => {
          this.snackBar.open('Error: comments could not be loaded', null, {
            duration: 4000,
          });
          console.log(err['error']);
          reject(err['error']);
        }
      );
    });
  }

  getProjectEvents(project_id: number){
    return new Promise((resolve, reject) => {
      this.http.get('/api/events/' + project_id, this.userService.httpOptions()).subscribe(
      (events)=> {
          resolve(events);
        },
        err => {
          this.snackBar.open('Error: events could not be loaded', null, {
            duration: 4000,
          });
          console.log(err['error']);
          reject(err['error']);
        }
      );
    });
  }

  postEvent(project_id: number, title: string, day: Date, start_time: string, end_time: string, description: string){
    return new Promise((resolve, reject) => {
      this.http.post('/api/events/'+project_id+'/', {project: project_id, title: title, day: day,
        start_time: start_time, end_time: end_time, description:description}, this.userService.httpOptions()).subscribe(event=>{
        resolve(event);
        this.snackBar.open('Event added', null, {
          duration: 4000,
        });
      },
      err=> {
        this.snackBar.open('Error: event could not be added', null, {
          duration: 4000,
        });
        reject(err['error'])
      });
    });
  }

  postComment(project_id: number, text: string) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/project_messages/' + project_id + '/', {text: text, project: project_id}, this.userService.httpOptions()).subscribe(message=>{
        resolve(message);
        this.snackBar.open('Comment added', null, {
          duration: 4000,
        });
      },
      err => {
        this.snackBar.open('Error: comment could not be added', null, {
          duration: 4000,
        });
        reject(err['error'])
      });
    });
  }

  postCommentToProjectMessage(message_id: number, text: string) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/project_messages_comments/', {text: text, message: message_id}, this.userService.httpOptions()).subscribe(
        data => {
          resolve(data);
        },
        err => {
          this.snackBar.open('Error: project message comment could not be added', null, {
            duration: 4000,
          });
          reject(this.errorsUnpack(err['error']));
        }
      );
    });
  }

  transmitEmail(project_id: number, email: string) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/projects/' + project_id + '/invite_user_to_project/', {email: email}, this.userService.httpOptions()).subscribe(email=>{
        resolve(email);
        this.snackBar.open('member invited', null, {
          duration: 4000,
        });
      },
      err => {
        this.snackBar.open('Error: member could not be invited', null, {
          duration: 4000,
        });
        console.log(err);
        reject(err['error']);
      });
    });
  }

  createProject(project: Project) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/projects/', project, this.userService.httpOptions()).subscribe(
        data => {
          resolve(data);
        },
        err => {
          this.snackBar.open('Error: project could not be added', null, {
            duration: 4000,
          });
          reject(this.errorsUnpack(err['error']));
        }
      );
    });
  }

  private errorsUnpack(errors) {
    if (typeof errors == 'string') {
      return ['', 'Oops, there are some errors. Check logs for more details.'];
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
