import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private authService: AuthService, private router: Router ){}

  public logout(){
    if(confirm('Are you sure you want to logout?')){
      //this.authService.logout();
      this.router.navigate(['login']);
    }
  }
}
