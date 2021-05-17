import { Tour } from './../models/tour.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OperatorUser } from '../models/operator.model';
import { OperatorAuthResposeData } from '../models/operatorAuth.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  operatorSub = new BehaviorSubject<OperatorUser>(null);
  tokenepxirationTimer:any;


  constructor(
    private http: HttpClient,
    private router: Router
  ) {   }

   postLogin(credentials) {
    return this.http.post<OperatorAuthResposeData>(environment.apiUrl+'/auth/operator', credentials)
    .pipe(catchError(this.handleError), tap( resData => {

      const expriationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      const operatorUser = new OperatorUser(resData.id, resData.username, resData.name, resData.token, resData.email, expriationDate, resData.isActive)
      this.operatorSub.next(operatorUser);
      this.autoLogout(+resData.expiresIn * 1000);
      localStorage.setItem('operatorData', JSON.stringify(operatorUser));

    }))
   }

   autoLogin() {
     const operatorData:{
       id: string;
       username: string;
       name: string;
      _token: string,
      _tokenExpiration: string,
      isActive: number;
      email: string;

     } = JSON.parse(localStorage.getItem('operatorData'));

     if(!operatorData) return;

     const loadedOperator = new OperatorUser(
       operatorData.id, operatorData.username, operatorData.name, operatorData._token, operatorData.email, new Date(operatorData._tokenExpiration), operatorData.isActive
     );

     if(loadedOperator.token) {
       this.operatorSub.next(loadedOperator);
       const expiryTime = new Date(operatorData._tokenExpiration).getTime() - new Date().getTime();
       this.autoLogout(expiryTime);
     }

   }




  logout(){
    this.operatorSub.next(null);
    this.router.navigate(['/travel-operators']);
    localStorage.removeItem('operatorData');
    if(this.tokenepxirationTimer) {
      clearTimeout(this.tokenepxirationTimer);
    }
    this.tokenepxirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenepxirationTimer = setTimeout(()=> {
     var confirmBox =  confirm("Press a button!\nEither OK or Cancel.");
     if(confirmBox){
      this.logout();
     }else {
       this.autoLogout(expirationDuration);
     }

    }, expirationDuration);

  }



  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = "An unkown error occured";
    if(!errorRes.error) {
      return throwError(errorMessage);
    }

    // switch(errorRes.error){
    //   case 'Invalid Username':
    //     errorMessage = 'Username is not available';
    //     break;
    //   case 'Invalid Password':
    //     errorMessage = 'Please check the password';
    // }
    errorMessage = errorRes.error;
    return throwError(errorMessage);
  }

}
