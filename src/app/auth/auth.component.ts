import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

interface TokenObj {
  token : string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  });
  registerMode = false;

  constructor(
    private apiservice:ApiService,
    private cookieservice: CookieService,
    private router : Router
  ) { }

  ngOnInit() {
    const mrToken = this.cookieservice.get('mr-token');
    if(mrToken) {
      this.router.navigate(['/movies']);
    }
  }
  saveForm(){
    if (!this.registerMode) {
      this.loginUser();
    } else {
      this.apiservice.registerUser(this.authForm.value).subscribe(
        result => {
          this.loginUser();
        },
        error => console.log(error)
      );
    }   
  }
  loginUser() {
    this.apiservice.loginUser(this.authForm.value).subscribe(
      (result: TokenObj) => {
        this.cookieservice.set("mr-token", result.token);
        this.router.navigate(['/movies']);
      },
      error => console.log(error)
    );
  }
}
