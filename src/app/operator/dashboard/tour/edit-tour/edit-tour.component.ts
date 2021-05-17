import { Tour } from './../../../../models/tour.model';
import { TourService } from 'src/app/service/tour.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import  *  as  data  from  'src/app/countries.json';
import { combineLatest, concat } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.css']
})
export class EditTourComponent implements OnInit {

  id: number;
  tourEditForm: FormGroup;
  multiTravel = false;
  countries: any = (data as any).default;
  editMode = false;
  tour: Tour;



  constructor(
    private route: ActivatedRoute,
    private tourService: TourService
  ) { }

  ngOnInit(): void {
    this.initTourForm();

    combineLatest([this.route.params, this.route.queryParams])
      .pipe(

        map(results => {
           this.id = results[0].id;
        this.editMode = this.id == results[1].allowedit;
        return {
          params: results[0].id,
          query: results[1].allowedit
        }
      })
      ,concatMap((res:any) => {
        return this.tourService.getTourById(res.params);
      })
      ).subscribe((tour:{data:Tour}) => {
        const tourData = tour.data[0];

        // this.touringCountriesArray = tourData.touringCountries;
        // console.log(this.touringCountriesArray)

       this.tour = tour.data;


       this.tourEditForm.setValue({
        tour_name: tourData.tour_name,
        from_date: tourData.from_date,
        to_date: tourData.to_date,
        country: tourData.country,
        multicity_travel: tourData.multicity_travel,
        nature_of_travel: tourData.nature_of_travel,
        tourId: this.id,
        touringCountries: []

       });


       if(tourData.touringCountries) {

        for (let touring of tourData.touringCountries) {
         const control = new FormControl(touring.countryCode, Validators.required);
         this.touringCountrySelect().push(control);

        }
      }



       //this.tourEditForm.get('touringCountries').patchValue(this.touringCountriesArray);



      });




  }


  private initTourForm(): void {



    this.tourEditForm = new FormGroup({
      tour_name: new FormControl(null, Validators.required),
      from_date: new FormControl(null, Validators.required),
      to_date: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      multicity_travel: new FormControl(null, Validators.required),
      nature_of_travel: new FormControl(null, Validators.required),
      touringCountries: new FormArray([]),
      tourId: new FormControl(null)
    })
  }


  onSubmit() {

    console.log(this.tourEditForm.value);
    this.tourService.updateTourById(this.tourEditForm.value);

  }

  onAddCountry() {
    const control = new FormControl(null, Validators.required);
    // (<FormArray>this.tourForm.get('touringCountries')).push(control);
    this.touringCountrySelect().push(control);
  }

  touringCountrySelect() {
    return this.tourEditForm.get('touringCountries') as FormArray
  }

  onDeleteCountryBox(i) {
   this.touringCountrySelect().removeAt(i);
  }


}

