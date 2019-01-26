import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../core/project.service';
import { Project } from '../core/models/project.model';
import { ProjectMessage } from '../core/models/project-message.model';
import { User } from "../core/models/user.model";
import { ProjectMessageComment } from '../core/models/project-message-comment.model';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { Event } from '../core/models/event.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { MatInput } from '@angular/material';

export interface DialogData {
  emo: string;
}

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  public project: Project = {title: 'Project is loading...', id: null, description: 'Please wait.'};
  public messages: ProjectMessage[];
  public events: Event[];
  public mode = 'indeterminate';
  public newCommentText = '';
  public title: string = '';
  public day: Date;
  public start_time: string = '';
  public end_time: string = '';
  public description: string = '';

  private colors = [
    '#FFB900',
    '#D83B01',
    '#B50E0E',
    '#E81123',
    '#B4009E',
    '#5C2D91',
    '#0078D7',
    '#00B4FF',
    '#008272',
    '#107C10',
    '#0096e0',
    '#d97638',
    '#eb5a50',
    '#d16ba6',
    '#749e5a',
    '#c94e30'
  ];

  @ViewChild(ChatListComponent) chatList: ChatListComponent;

  constructor(public dialog: MatDialog,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectService.getProject(params.get('id')).then(project => {
          this.project = <Project>project;
          this.loadComments();
          this.loadEvents();
        }
      ).catch(() => this.mode = 'determinate');
    });
  }

  loadEmoji(): void {
    const dialogRef = this.dialog.open(DialogOverviewMessage, {
      width: '250px',
      data: {emo: ''}
    });

    dialogRef.afterClosed().subscribe(emoji => {
      if (!emoji) {
        return;
      }
      this.newCommentText = this.newCommentText + emoji;
    });
  }

  private loadEvents(){
    this.mode = 'indeterminate';
    this.projectService.getProjectEvents(this.project.id).then(events => {
      this.events=<Event[]>events;
    }).finally(()=> this.mode = 'determinate');
  }

  @ViewChild('dateinput', {
    read: MatInput
  }) dateinput: MatInput;

  public postEvent() {
    if ((this.title == null || this.title == '') && (this.day == null) && (this.start_time == null || this.start_time == '') && (this.end_time == null || this.end_time == '')) {
      this.snackBar.open('Please enter title, date, start time and end time first', null, {
        duration: 4000,
      });
      return;
    }

    this.mode='indeterminate';
    this.projectService.postEvent(this.project.id, this.title, this.formatDay(this.day), this.start_time, this.end_time, this.description).then(event => {
      this.events.push(<Event>event);
      this.title = '';
      this.start_time = '';
      this.dateinput.value = '';
      this.end_time = '';
      this.description = '';
    }).finally(()=> this.mode='determinate');
  }

  private formatDay(date){
    var newDate = new Date(date);
    var year = newDate.getFullYear();
    var month = (newDate.getMonth() + 1).toString(); //add 1 as Jan is '0'
    var day = newDate.getDate().toString();

    month = month.length > 1? month: '0'+month;
    day = day.length > 1? day: '0'+day;

    date = year + '-' + month + '-' + day;
    return date;
}

  private loadComments() {
    this.mode = 'indeterminate';
    this.projectService.getProjectMessages(this.project.id).then(messages => {
      this.messages = <ProjectMessage[]>(<ProjectMessage[]>messages).sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ).reverse();
      this.messages.map(value => {
        value.user = new User(value.user); // convert json dict to object
        value.comments.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()).reverse();
      });
    }).finally(() => this.mode = 'determinate');
  }

  public postComment() {
    if (this.newCommentText == null || this.newCommentText == '') {
      this.snackBar.open('Please enter your message first', null, {
        duration: 4000,
      });
      return;
    }
    this.mode = 'indeterminate';
    this.projectService.postComment(this.project.id, this.newCommentText).then(message=>{
      // convert user json dict to object
      let messageObj = <ProjectMessage>message;
      messageObj.user = new User(messageObj.user);
      this.messages.unshift(<ProjectMessage>messageObj);
      this.newCommentText = '';
    }).finally(() => this.mode = 'determinate');
  }

  public postCommentToMessage(message_id: number) {
    let textSelector = 'mat-card[data-id="' + message_id + '"] textarea';
    let textAreaElement = document.querySelector(textSelector) as HTMLTextAreaElement;

    if (textAreaElement.value == null || textAreaElement.value == '') {
      this.snackBar.open('Please enter your comment first', null, {
        duration: 4000,
      });
      return;
    }

    this.mode = 'indeterminate';
    this.projectService.postCommentToProjectMessage(message_id, textAreaElement.value).then(comment => {
      this.messages.filter(value => value.id == message_id)[0].comments.unshift(<ProjectMessageComment>comment);
    }).finally(() => {
      textAreaElement.value = '';
      this.mode = 'determinate';
    });
  }

  public tabSelectionChanged(index) {
    switch (index) {
      case 0:
        this.loadComments();
        break;
      case 1 :
        this.mode = 'indeterminate';
        this.chatList.update().finally(() => this.mode = 'determinate');
        break;
    }
  }
}

@Component({
  selector: 'dialog-overview-message',
  templateUrl: 'dialog-overview-message.html',
})
export class DialogOverviewMessage {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewMessage>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  emojiList = [
      '😀', '😁', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗',
      '😙', '😚', '☺', '😐', '😑', '😶',  '😏', '😣', '😥', '😮',
     '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '😒', '😓', '😔', '😕',
      '☹',  '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩',  '😬', '😰', '😱',
     '😳', '😵', '😠', '😡', '😷', '😇', '😈', '👿', '👹', '👺', '💀', '☠',  '👻',
      '👽', '👾', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🐱‍👤 ', '🙈',
      '🙉', '🙊', '🐵', '‍❤', '👫', '👬', '👭', '👯‍', '♂', '♀', '👀', '👅', ' 👄', '👣'
  ];

  onNoClick(): void {
    this.dialogRef.close();
  }
}
