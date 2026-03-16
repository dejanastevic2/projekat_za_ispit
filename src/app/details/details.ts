import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { ToyModel } from '../models/toy.model';
import { Utils } from '../utils'; // Proveri da li je putanja do utils fajla tačna
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  toy = signal<ToyModel | null>(null);

  constructor(
    private route: ActivatedRoute,
    public utils: Utils // Omogućava korišćenje utils u HTML-u
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      axios.get(`https://toy.pequla.com/api/toy/${id}`)
        .then(rsp => this.toy.set(rsp.data));
    });
  }
}