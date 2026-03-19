import { Component, signal, computed } from '@angular/core';
import { ToyModel } from '../models/toy.model'; 
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Utils } from '../utils';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ToyService } from '../services/toy.service';
import { Loading } from '../loading/loading';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink, MatCardModule, MatButtonModule, MatIconModule, 
    DecimalPipe, Loading, FormsModule, MatInputModule, 
    MatSelectModule, MatFormFieldModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public authService = AuthService;
  toys = signal<ToyModel[]>([]);

  // SIGNALI ZA FILTERE
  searchQuery = signal<string>('');
  selectedType = signal<string>('all');
  selectedTarget = signal<string>('all');
  maxPrice = signal<number>(15000);

  constructor(public utils: Utils) {
    ToyService.getToy().then(rsp => {
      const sorted = rsp.data.sort((t1: any, t2: any) => {
        return new Date(t2.productionDate).getTime() - new Date(t1.productionDate).getTime();
      });
      this.toys.set(sorted);
    });
  }

 
  filteredToys = computed(() => {
    return this.toys().filter(t => {
      const search = this.searchQuery().toLowerCase();
      const matchText = t.name.toLowerCase().includes(search) || t.description.toLowerCase().includes(search);
      const matchType = this.selectedType() === 'all' || t.type.name === this.selectedType();
      const matchTarget = this.selectedTarget() === 'all' || t.targetGroup === this.selectedTarget();
      const matchPrice = t.price <= this.maxPrice();

      return matchText && matchType && matchTarget && matchPrice;
    });
  });
}