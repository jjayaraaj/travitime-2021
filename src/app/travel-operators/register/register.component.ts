import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.initRegisterForm();
  }

  initRegisterForm() : void {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.email]),
      'name': new FormControl(null),
      'company': new FormControl(null),
      'address': new FormControl(null),
      'country': new FormControl(null),
      'phone': new FormControl(null),
      'email': new FormControl(null),
      'website': new FormControl(null)
    });
  }

  onSubmit(): void {
    console.warn(this.registerForm.value);
  }

}
