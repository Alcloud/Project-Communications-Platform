import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../core/project.service';
import { Project } from '../core/models/project.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {

  public errorMsg: any[];

  public project: Project = {title: null, id: null, description: null};

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {}

  create() {
    this.projectService.createProject(this.project).then((project) => {
      // tslint:disable-next-line:prefer-const
      let local_project = <Project>project;
      this.router.navigate(['/projects/' + local_project.id]);
    }, (err) => {
      this.errorMsg = err;
    });
  }

}
