import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountriesSmall } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  private _baseUrl: string = 'https://restcountries.eu/rest/v2';

  get regions(): string[] {
    return [...this._regions];
  }

  constructor(private http: HttpClient) { }

  getCountriesByRegion(region: string): Observable<CountriesSmall[]> {

    const url: string = `${this._baseUrl}/region/${region}?fields=alpha3Code;name`;

    return this.http.get<CountriesSmall[]>(url);
  }
}
