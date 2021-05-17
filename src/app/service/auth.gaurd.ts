import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class AuthGaurd implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.operatorSub.pipe(take(1), map(operatorUser => {
      const isAuth =  !!operatorUser;
      if(isAuth){
        return true;
      }
      this.router.navigate(['/travel-operators'], {queryParams: {returnUrl: state.url}});
      return false;
      //return this.router.createUrlTree(['/travel-operators'], {queryParams: {returnUrl: state.url}});
    }));



  }


  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }
}
