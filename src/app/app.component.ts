import { Component } from '@angular/core';
import * as XRegExp from 'xregexp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'happy-dogs-proto';

  constructor() {
    console.log(XRegExp(`^([\\p{L}\\p{Common}\\p{Sc} \\-])+$`).test('Автоцентр РМ-Маркет!€.'));
  }
}
