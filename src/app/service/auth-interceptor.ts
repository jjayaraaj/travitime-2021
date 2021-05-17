import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
     return this.authService.operatorSub.pipe(
      take(1),
      exhaustMap((operatorUser) => {
        // console.log("as,djhvasd", operatorUser)
        if(!operatorUser) {
          return next.handle(req);
        }
        // console.log('Bearer '+operatorUser.token)
        const modifiedOperator =  req.clone({
          headers: req.headers.set("Authorization", "Bearer "+ operatorUser.token)
        //  params: new HttpParams().set("Authorization", "Bearer "+operatorUser.token)
        });
        // console.log(operatorUser.token);
        return next.handle(modifiedOperator);
      })
    )

  }

}
