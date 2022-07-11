import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  /* templateUrl: './app.component.html', */
  template: '<h1>Hello world! {{ myvariable }}</h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  myvariable = 'Pryvit';
}
