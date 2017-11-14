import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  feature = 'recipe';

  onNavigate(event: string) {
    this.feature = event;
  }
  public ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyBOSauDJbF3Px4hk5APrkL_uQqeLwI9zNU',
      authDomain: 'funny-angular-app.firebaseapp.com'
    });
  }
}
