import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import { HomeComponent } from '../home/home.component';
import { TopNavComponent } from "../top-nav/top-nav.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [EmployeeListComponent, HomeComponent, TopNavComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
