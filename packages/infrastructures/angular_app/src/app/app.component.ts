import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  standalone: true,
  providers: [],
})
export class AppComponent{
  title = 'angular_app';
}
