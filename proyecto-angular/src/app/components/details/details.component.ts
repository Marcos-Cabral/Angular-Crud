import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project.service';
import {global} from '../../services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';
 
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers:[ProjectService]
})
export class DetailsComponent implements OnInit {

  public url:string;
  public projects: Project;
  public confirm: boolean;

  constructor(
    private _projectService:ProjectService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.url=global.url;
    this.confirm=false;
  }
  
  ngOnInit() {
    this._route.params.subscribe(params=>{
      let id= params.id;

      this.getProject(id);
    });
  }

  getProject(id){
    this._projectService.getProject(id).subscribe(
      response=>{
        if(response.project){
          this.projects=response.project;
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  deleteProject(id){
    this._projectService.deleteProject(id).subscribe(
      response=>{
        if(response){
          this._router.navigate(['/proyectos']);
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  setConfirm(confirm){
    this.confirm=confirm;
  }
}
