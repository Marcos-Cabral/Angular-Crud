import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project.service';
import {UploadService} from '../../services/upload.service';
import {global} from '../../services/global';
import { UserService } from '../../services/user.service';
import {User} from '../user/user.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers:[ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title:string;
  public projecto:Project;
  public status:boolean;
  public filesToUpload: Array<File>;
  public saveProject;
  public url:string;;
  constructor(
    private _projectService:ProjectService,
    private _uploadService:UploadService,
    private userService:UserService
  ) {
    this.title="Crear proyecto";
    this.projecto=new Project('','','','','','');
    this.url=global.url;
   }

  ngOnInit() {
   
  }
  onSubmit(form){
    this._projectService.saveProject(this.projecto).subscribe(
      response=>{
         if(response.project){          

            //ahora subo la imagen
            this._uploadService.fileRequest(this.url+"upload-image/"+response.project._id,[],this.filesToUpload,'img').then((result:any)=>{
              this.saveProject=response.project;
              this.status=true;               
               form.reset();
            });

         }else{
           this.status=false;
         }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput:any){
    
    this.filesToUpload= <Array<File>>fileInput.target.files;

  }

}
