import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthendicated;
  private _$operatorSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this._$operatorSub = this.authService.operatorSub.subscribe( operatorUser => {
      this.isAuthendicated = !!operatorUser;

    })
  }
  ngOnDestroy() {
    this._$operatorSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
