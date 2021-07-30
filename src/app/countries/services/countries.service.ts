import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  constructor() { }
}
