import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import  *  as  data  from  'src/app/countries.json';
import { TourService } from 'src/app/service/tour.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-tour',
  templateUrl: './new-tour.component.html',
  styleUrls: ['./new-tour.component.css']
})
export class NewTourComponent implements OnInit {

  countries: any = (data as any).default ;
  tourForm: FormGroup;
  multiTravel = false;
  id: number;
  editMode = false;
  editPage = false;

  constructor(
    private tourService: TourService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {


    this.initTourForm();
  }

  getAllTourData(): void {
    this.tourService.getAllTourData();
  }

  private initTourForm(): void {

    this.tourForm = new FormGroup({
      tour_name: new FormControl(null, Validators.required),
      from_date: new FormControl(null, Validators.required),
      to_date: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      multicity_travel: new FormControl(null, Validators.required),
      nature_of_travel: new FormControl(null, Validators.required),
      touringCountries: new FormArray([]).value,

    })
  }

  onAddCountry() {
    const control = new FormControl(null, Validators.required);
    // (<FormArray>this.tourForm.get('touringCountries')).push(control);
    this.touringCountrySelect().push(control);

  }

  touringCountrySelect() {
    return this.tourForm.get('touringCountries') as FormArray
  }

  onDeleteCountryBox(i) {
   this.touringCountrySelect().removeAt(i);
  }

  onSubmit() {
    this.tourService.postNewTour(this.tourForm.value);
  }

}
