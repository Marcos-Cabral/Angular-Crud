import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'; 
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private _router:Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    
  }
  logIn(username:string, password:string, event:Event){
    event.preventDefault();

    this.loginService.login(username,password).subscribe(
      res=>{
        let _user : User = {username: username};
        this.userService.setUserLoggedIn(_user);
        console.log(res);
      },
      error=>{
        console.log(error);
      },
      ()=> this.navigate()
    );
  }
  navigate(){
    this._router.navigate(['/proyectos']);
  }


}
