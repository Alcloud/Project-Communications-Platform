import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../core/project.service';
import { Project } from '../core/models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];
public title: string;

@Output() sendTitle = new EventEmitter<string>();

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().then(projects => this.projects = <Project[]>projects);
  }

  changeTitle(headline: string) {
    this.sendTitle.emit(headline)
  }

}
