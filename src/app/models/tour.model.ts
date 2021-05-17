import { TourCountry } from './touring-country.model';
export class Tour {
  constructor(
    public id: number,
    public tour_name: string,
    public from_date: Date,
    public to_date: Date,
    public country: string,
    public multicity_travel: string,
    public nature_of_travel: string,
    public isActive: string,
    public touringCountries: TourCountry

  ) {}
}
