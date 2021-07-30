import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesSmall } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required]
  });

  // fill selectors
  regions: string[] = [];
  countries: CountriesSmall[] = [];
  constructor(
    private countriesService: CountriesService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.regions = this.countriesService.regions;

    // when region changes
    this.myForm.get('region')?.valueChanges
      .subscribe(region => {
        this.countriesService.getCountriesByRegion(region)
          .subscribe(countries => {
            console.log(countries);
            this.countries = countries;
        })
    })
  }

  save() {
    
  }

}
