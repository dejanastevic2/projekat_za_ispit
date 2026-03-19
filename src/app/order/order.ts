import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToyModel } from '../models/toy.model';
import { DataService } from '../services/data.service';
import { ToyService } from '../services/toy.service';
import { AuthService } from '../services/auth.service';
import { Loading } from '../loading/loading';
import { Utils } from '../utils';
import { Alerts } from '../alerts';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    FormsModule, 
    MatButtonModule, 
    Loading, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule
  ],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  
  public activeUser = AuthService.getActiveUser();

  public address: string = '';
  public phone: string = '';
  public note: string = '';
  public quantity: number = 1;

  public toy = signal<ToyModel | null>(null);
  public toys = DataService.getToys();
  public typeOfToys = DataService.getTypeOfToys();

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    public utils: Utils, 
    public authService: AuthService
  ) {
  
    if (this.activeUser) {
      this.address = this.activeUser.address || '';
      this.phone = this.activeUser.phone || '';
    } else {
      
      this.router.navigate(['/login']);
    }

    this.route.params.subscribe(params => {
      console.log('Parametri iz rute:', params);
      const id = Number(params['id']);
      if (id) {
        ToyService.getToyId(id).then(rsp => {
          this.toy.set(rsp.data);
        });
      }
    });
  }

  confirmOrder() {
    const orderData = {
      address: this.address,
      phone: this.phone,
      note: this.note,
      quantity: this.quantity,
      totalPrice: ((this.toy()?.price ?? 0) * this.quantity) + 300
    };

    AuthService.createOrder(orderData, this.toy()?.toyId!);

    Alerts.success(`You have successfully ordered ${this.quantity} pc. of toy: ${this.toy()?.name}`);
    this.router.navigate(['/cart']);
  }

  updateTotal() {
    if (this.quantity < 1) this.quantity = 1;
  }
}