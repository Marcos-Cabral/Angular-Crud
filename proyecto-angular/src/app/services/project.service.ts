import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Project} from '../models/project';
import {global} from './global';

@Injectable()
export class ProjectService{
    public url:string;
    constructor(
        private _http: HttpClient
    ){
        this.url=global.url;
    }

    testService(){
        return 'anda';
    }

    saveProject(project:Project): Observable<any>{
        let params =JSON.stringify(project);
        let headers= new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'saveProject',params, {headers: headers});

    }

    //conseguir objetos json con todos los objetos de la base de datos
    getProjects(): Observable <any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.get(this.url+'projects', {headers: headers});
    }
    
    getProject(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'project/'+id, {headers: headers});

    }

    deleteProject(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.delete(this.url+'project/'+id, {headers: headers});
    }

    updateProject(project):Observable <any>{
        let params= JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+'project/'+project._id, params,{headers: headers});

    }


}