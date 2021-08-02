import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
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

  getCountryByCode(code: string): Observable<any>{

    if (!code) {
      return of(null);
    }
    const url = `${this._baseUrl}/alpha/${code}`;
    return this.http.get(url);
  }

  getCountryByCodeSmall(code: string): Observable<any>{

    if (!code) {
      return of({});
    }

    const url = `${this._baseUrl}/alpha/${code}?fields=alpha3Code;name`;
    return this.http.get(url);
  }

  getCountriesByCodes(borders: string[]): Observable<CountriesSmall[]> {
    if (!borders) {
      return of([]);
    }

    const requests: Observable<CountriesSmall>[] = [];

    borders.forEach(code => {
      const request = this.getCountryByCodeSmall(code);
      requests.push(request);
    });

    return combineLatest(requests);
  }
}
