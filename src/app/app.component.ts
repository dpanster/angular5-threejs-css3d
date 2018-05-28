import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// component decorator(s)
@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: './app.component.html'

})
export class AppComponent {
  test = 'app';
}
