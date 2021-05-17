import { catchError } from 'rxjs/operators';
import { Tour } from './../models/tour.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { pipe, Subject, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TourService {
  private tour = new Subject<Tour>();
  constructor(
    private http: HttpClient
  ) {}

    getAllTourData() {
      return this.http.get<{data: Tour[]}>(environment.apiUrl+'/tour')
      .pipe(catchError(this.handleError))
    }

    getTourById(id) {
      return this.http.get<{data: Tour}>(`${environment.apiUrl}/tour/${id}`)
      .pipe(catchError(this.handleError))
    }

    postNewTour(postData) {
      this.http.post(environment.apiUrl+'/tour/new', postData).subscribe(data => console.log(data));
    }

    updateTourById(tour) {
      this.http.put(environment.apiUrl+'/tour/update', tour).subscribe( data=> console.log(data));
    }

    deleteTour(tour: Tour) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          tourId: tour.id
        },
      };

      return this.http.delete(environment.apiUrl+'/tour/delete/', options)
              .pipe(catchError(this.handleError))
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
