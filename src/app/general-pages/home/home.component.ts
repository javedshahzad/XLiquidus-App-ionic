import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  checkbackground: boolean = false;
  checkbackgroundalready: boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit() { }

  doLogin() {
    this.router.navigate(['/user-panel/dashboard'])
  }

  goToCreateAccount() {
    this.checkbackground = !this.checkbackground;
    this.router.navigate(['/signup'])
  }

  goToLogin() {
    this.checkbackgroundalready = !this.checkbackgroundalready;
    this.router.navigate(['/login'])
  }

  goToSignUp() {
    this.checkbackgroundalready = !this.checkbackgroundalready;
    this.router.navigate(['/signup-options'])
  }

  ngOnDestroy() {
    this.checkbackground = false;
    this.checkbackgroundalready = false;
  }
}
