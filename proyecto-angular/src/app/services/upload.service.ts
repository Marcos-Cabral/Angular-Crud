import {Injectable} from '@angular/core';
import {global} from './global';

@Injectable()
    export class UploadService{
  makeFileRequest(arg0: string, arg1: undefined[], filesToUpload: File[], arg3: string) {
    throw new Error("Method not implemented.");
  }
        public url:string;

        constructor(){
            this.url=global.url;
        }

        fileRequest(url:string,params:Array<string>, files:Array<File>,name:string){
            return new Promise(function(resolve, reject){
                var formData:any= new FormData();        
                var xhr= new XMLHttpRequest();//sinonimo de ajax

                for(var i =0; i<files.length;i++){
                    formData.append(name,files[i],files[i].name);
                    //adjuntar los archivos que llegan por formulario
                }

                xhr.onreadystatechange= function(){
                    if(xhr.readyState==4){ 
                        if(xhr.status==200){
                            //si esta todo listo
                            resolve(JSON.parse(xhr.response));
                        }else{
                            reject(xhr.response);
                        }
                    }
                }

                xhr.open('POST',url,true); //hago la peticion por post, paso url
                xhr.send(formData); //envio todo el formulario

            });
        }
    }
