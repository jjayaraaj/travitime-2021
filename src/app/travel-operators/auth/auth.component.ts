import { AuthService } from './../../service/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import{ API } from './../../service/constant';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  @ViewChild('f') signupForm: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {


   }

  ngOnInit(): void {
  }

  onSubmit() {

    if(!this.signupForm.valid) return;

    this.authService.postLogin(this.signupForm.value).subscribe(authResponse => {

      this.router.navigate(['/operator/dashboard']);
    }, error => {
      console.log(error);
    })
  }



}
