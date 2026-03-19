import { Component, signal } from '@angular/core';
import { ToyModel } from '../models/toy.model'; 
import { RouterLink } from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Utils } from '../utils';
import {MatIconModule} from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ToyService } from '../services/toy.service';
import { Loading } from '../loading/loading';
@Component({
  selector: 'app-home',
  imports: [RouterLink,MatCardModule, MatButtonModule,MatIconModule,DecimalPipe, Loading],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public authService=AuthService
  toys = signal<ToyModel[]>([]);

  constructor( public utils: Utils) {
    ToyService.getToy()
    .then(rsp => {
    const sorted = rsp.data.sort((t1: any, t2: any) => {
      return new Date(t2.productionDate).getTime() - new Date(t1.productionDate).getTime();
    });
    this.toys.set(sorted);
  });
  }
}