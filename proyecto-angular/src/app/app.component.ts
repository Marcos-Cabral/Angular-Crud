import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import {User} from './components/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-angular';
}
