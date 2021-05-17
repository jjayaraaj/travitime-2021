import { AuthService } from './../service/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  isAuthendicated = false;
  private _$operatorSub: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this._$operatorSub = this.authService.operatorSub.subscribe( operatorUser => {
      this.isAuthendicated = !!operatorUser;
      console.log(!!operatorUser)
    })
  }

  ngOnDestroy() {
    this._$operatorSub.unsubscribe();
  }

}
