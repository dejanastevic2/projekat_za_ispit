import { Component, signal } from '@angular/core';
import axios from 'axios';
import { ToyModel } from '../models/toy.model'; 
import { RouterLink } from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Utils } from '../utils';

@Component({
  selector: 'app-home',
  imports: [RouterLink,MatCardModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  toys = signal<ToyModel[]>([]);

  constructor( public utils: Utils) {
    axios.get('https://toy.pequla.com/api/toy')
    .then(rsp => {
    // Sortiramo igračke prema datumu proizvodnje (od najnovije ka najstarijoj)
    const sorted = rsp.data.sort((t1: any, t2: any) => {
      return new Date(t2.productionDate).getTime() - new Date(t1.productionDate).getTime();
    });
    this.toys.set(sorted);
  });
  }
}