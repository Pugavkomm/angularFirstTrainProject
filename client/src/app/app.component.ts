import {Component} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {NavComponent} from './nav/nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
