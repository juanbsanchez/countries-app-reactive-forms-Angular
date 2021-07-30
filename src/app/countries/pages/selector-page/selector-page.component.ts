import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required]
  });

  // fill selectors
  regions: string[] = [];

  constructor(
    private countriesService: CountriesService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.regions = this.countriesService.regions;
  }

  save() {
    
  }

}
