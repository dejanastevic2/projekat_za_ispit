import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ToyModel } from '../models/toy.model';
import { Utils } from '../utils'; // Proveri da li je putanja do utils fajla tačna
import { CommonModule } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';
import {MatListItem, MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { ToyService } from '../services/toy.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatListModule,MatIconModule,RouterLink,MatButtonModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  public authService=AuthService
  toy = signal<ToyModel | null>(null);


  constructor(
    private route: ActivatedRoute,
    public utils: Utils 
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      ToyService.getToyId(id)
        .then(rsp => this.toy.set(rsp.data));
    });
  }
}