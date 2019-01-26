import {Component, Input, ViewChild} from '@angular/core';
import {UserService} from './core/user.service';
import {ObservableMedia} from '@angular/flex-layout';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from './core/project.service';
import {Project} from './core/models/project.model';
import {ProjectListComponent} from './project-list/project-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title = "PKP.django";
  public sidenavSdowed;
  public id: number;
  // public projects: Project[];

  constructor(private route: ActivatedRoute,
              public media: ObservableMedia,
              public userService: UserService,
              private router: Router,
              private projectService: ProjectService) {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // this.projectService.getProjects().then(projects => this.projects = <Project[]>projects);
    this.sidenavSdowed = false;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

  receiveTitle($event) {
    this.title = $event
  }
}
