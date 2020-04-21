import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]

})
export class EditComponent implements OnInit {

  public title: string;
  public projecto: Project;
  public status: boolean;
  public filesToUpload: Array<File>;
  public saveProject;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = "Editar proyecto";
    this.url = global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;

      this.getProject(id);
    });
  }

  getProject(id) {
    this._projectService.getProject(id).subscribe(
      response => {
        this.projecto = response.project;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(){
  	this._projectService.updateProject(this.projecto).subscribe(
		response => {
  			if(response){
				
				// Subir la imagen
				if(this.filesToUpload){
					this._uploadService.fileRequest(global.url+"upload-image/"+this.projecto._id, [], this.filesToUpload, 'img')
					.then((result:any) => {
            this.saveProject = result;
						this.status = true;
					});
				}else{
					this.saveProject = response.project;
					this.status = true;
				}
				
			}else{
				this.status = false;
			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}
