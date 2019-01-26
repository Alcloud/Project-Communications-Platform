import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../core/models/user.model';
import { ProjectService } from '../core/project.service';
import { UserService } from '../core/user.service';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.scss']
})
export class MemberlistComponent implements OnInit {
  public users: User[];
  public id: number;
  public emailAdress = '';

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private userService: UserService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(this.id.toString()).then((project: any) => {
      let current_user_id = this.userService.currentUser.id;
      this.users = project.users.reduce(function(filtered, user) {
        if (user.id!=current_user_id) {
           filtered.push(new User(user));
        }
        return filtered;
      }, []);
    });
  }

  //Dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(InviteDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.emailAdress = result;
      this.projectService.transmitEmail(this.id, this.emailAdress).then(email => {
        this.emailAdress = '';
      });
    });
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'invite-dialog',
  templateUrl: 'invite-dialog.html',
})
export class InviteDialog{
  public emailAdress: string;
  matcher = new MyErrorStateMatcher();

  emailFormControl = new FormControl('', [
    Validators.email,
  ]);

  constructor(
    public dialogRef: MatDialogRef<InviteDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
