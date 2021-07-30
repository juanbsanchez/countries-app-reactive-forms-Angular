import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesSmall } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';
import {switchMap, tap} from 'rxjs/operators'
@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  });

  // fill selectors
  regions: string[] = [];
  countries: CountriesSmall[] = [];
  borders: string[] = [];
  constructor(
    private countriesService: CountriesService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.regions = this.countriesService.regions;

    // when region changes
    /* this.myForm.get('region')?.valueChanges
      .subscribe(region => {
        this.countriesService.getCountriesByRegion(region)
          .subscribe(countries => {
            console.log(countries);
            this.countries = countries;
          });
    }) */

    this.myForm.get('region')?.valueChanges
      .pipe(
        tap((_) => {
          this.myForm.get('country')?.reset('');
        }),
        switchMap(region => this.countriesService.getCountriesByRegion(region))
      )
      .subscribe(countries => {
        this.countries = countries;
      });
    
    //When change country
    this.myForm.get('country')?.valueChanges
      .pipe(
        tap(() => {
          this.borders = [];
          this.myForm.get('border')?.reset('');
        }),
        switchMap(code => this.countriesService.getCountryByCode(code))
      )
      .subscribe(country => {
        this.borders = country?.borders || [];
      });
  }

  save() {
    
  }

}
