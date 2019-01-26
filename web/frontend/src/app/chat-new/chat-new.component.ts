import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../core/models/user.model';
import { ChatService } from '../core/chat.service';
import { ProjectService } from '../core/project.service';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-chat-new',
  templateUrl: './chat-new.component.html',
  styleUrls: ['./chat-new.component.scss']
})
export class ChatNewComponent implements OnInit {

  public type: string;
  public users: User[];
  private selectedUsers: User[];
  private title: String;
  private project_id: number;

  constructor(private route: ActivatedRoute, private projectService: ProjectService,
    private userService: UserService,
    private chatServise: ChatService, private router: Router) {
    this.route.params.subscribe( params => this.type=params.type );
}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.project_id = parseInt(params.get('project_id'));
      this.projectService.getProject(params.get('project_id')).then((project: any) => {
        let current_user_id = this.userService.currentUser.id;
        this.users = project.users.reduce(function(filtered, user) {
          if (user.id!=current_user_id) {
             filtered.push(new User(user));
          }
          return filtered;
        }, []);
      });
    });
  }

  private createPrivateChat(user: User){
    this.chatServise.createOrGetPrivateChat(user.id, this.project_id).then((chat:any)=>this.router.navigate(['chats/'+ chat.id]));
  }
  private createGroupChat(){
    const ids = this.selectedUsers.map(u => u.id);
    this.chatServise.createGroupChat(this.title, this.project_id, ids).then((chat:any)=>this.router.navigate(['chats/'+ chat.id]));
  }
}
