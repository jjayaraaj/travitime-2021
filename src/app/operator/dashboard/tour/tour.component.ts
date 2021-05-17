import { Tour } from './../../../models/tour.model';
import { TourService } from './../../../service/tour.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  tours: Tour[] = [];

  constructor(
    private tourService: TourService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getAllTourData();
    console.log(this.tours);
  }

  getAllTourData(): void {
    this.tourService.getAllTourData().subscribe(
      data => {
        this.tours = (data.data);
      }
    );
  }

  onDeleteTour(tour: Tour) {
    this.tourService.deleteTour(tour).subscribe( result => {
      this.tours = this.tours.filter(f=> f.id !== tour.id);
      console.log(this.tours)
      //this.tours.splice(index, 1)
    })
  }

  onEditTour(tour: Tour) {
    // const tourId = btoa(tour.id.toString())
    this.router.navigate([tour.id, 'edit'], {relativeTo: this.route, queryParams: {allowedit: tour.id}})
  }


}
