import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../core/chat.service';
import { User } from '../core/models/user.model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  public chats: any[];

  @Input() project_id: number;

  constructor(private chatService: ChatService) { }
  public updateInterval;

  ngOnInit() {
    this.updateInterval = interval(3000).subscribe(val => this.update() );

  }
  
  ngOnDestroy() {
    if (this.updateInterval) {
      this.updateInterval.unsubscribe();
    }
  }

  public update(): Promise<void>{
    return new Promise<void>((resolve, reject) =>{
      this.chatService.getChats(this.project_id).then(chats=> {
        this.chats = <any[]>chats;
        resolve();
      }).catch(()=>reject());
    });
  }

  public getAvatarColor(name): string {
    let sum = name[0].charCodeAt(0) +name[1].slice(-1).charCodeAt(0);
    return this.getColors()[sum % this.getColors().length];
  }

  public getUser(u){
    return new User(u);
  }

  private getColors() {
    return [
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
  }

}
