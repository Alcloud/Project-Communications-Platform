import { Component, OnInit, Inject } from '@angular/core';
import { ChatService } from '../core/chat.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core/user.service';
import { Message } from '../core/models/message.model';
import { interval } from 'rxjs';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  emo: string;
}

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {

  public messages: any[];
  public chat: any = {title: 'Loading...'};
  public newMeddageText: string = '';
  public mode: string = 'indeterminate';
  public updateInterval;

  constructor(
    public dialog: MatDialog,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const chat_id = params.get('id');
      this.chatService.getChat(chat_id).then(chat=> this.chat = <any>chat);
      this.chatService.getMessages(chat_id).then((messages: any[])=> {
        this.messages =  messages.map(m=> new Message(m));
        this.updateInterval = interval(3000).subscribe(val => this.getNewMessages() );
      })
      .finally(()=> this.mode = 'determinate');
    });
  }

  loadEmoji(): void {
    const dialogRef = this.dialog.open(DialogOverviewChat, {
      width: '250px',
      data: {emo: ''}
    });

    dialogRef.afterClosed().subscribe(emoji => {
      if (!emoji) {
        return;
      }
      this.newMeddageText = this.newMeddageText + emoji;
    });
  }

  public sendMessage(){
    if (this.newMeddageText == null || this.newMeddageText == '') {
      this.snackBar.open('Please enter your message first', null, {
        duration: 4000,
      });
      return;
    }

    this.mode = 'indeterminate';
    this.newMeddageText = this.urlify(this.newMeddageText);

    this.chatService.sendMessage(this.chat.id, this.newMeddageText).then((message)=>{
      this.messages.push(new Message(message));
      this.newMeddageText = '';
    }).finally(()=> this.mode = 'determinate');
  }

  public deleteMessage(msg){
    this.chatService.deleteMessage(msg.chat_id, msg.id).then((id)=>{
      this.messages.splice(this.messages.indexOf(msg), 1);
    });
  }

  // make an URL from string
  public urlify(text) {
    //var urlRegex = /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/g
    var urlRegex = /(ftp:\/\/|http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
    //var urlRegex = /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
    return text.replace(urlRegex, function(url) {
      if (!/^(f|ht)tps?:\/\//i.test(url)) {
        return '<a href="' + "http://" + url + '" target="_blank">' + "http://" + url + '</a>';
      } else {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
      }
    })
  }

  private getNewMessages(){
    let n = this.messages.length;
    let last_id = 0;
    if(n != 0){
      last_id = this.messages[n-1].id;
    }
    this.chatService.getMessages(this.chat.id, last_id).then((messages: any[])=> {
      if(messages.length>0)
        this.messages = this.messages.concat(messages.map(m=> new Message(m)));
    });
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      this.updateInterval.unsubscribe();
    }
  }
}

@Component({
  selector: 'dialog-overview-chat',
  templateUrl: 'dialog-overview-chat.html',
})
export class DialogOverviewChat {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewChat>,
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
