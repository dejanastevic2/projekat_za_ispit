import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToyModel } from '../models/toy.model';
import { OrderModel } from '../models/order.model'; 
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

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    public utils: Utils
  ) {
  
    if (this.activeUser) {
      this.address = this.activeUser.address || '';
      this.phone = this.activeUser.phone || '';
    } else {
      this.router.navigate(['/login']);
    }

    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (id) {
        ToyService.getToyId(id).then(rsp => {
          this.toy.set(rsp.data);
        });
      }
    });
  }

 confirmOrder() {
  const currentToy = this.toy();
  if (!currentToy) return;

  const orderData: any = {
    address: this.address,
    phone: this.phone,
    note: this.note,
    quantity: this.quantity,
    totalPrice: (currentToy.price * this.quantity) + 300,
    toyName: currentToy.name,
    type: currentToy.type.name, 
    age: currentToy.ageGroup.name, 
    targetGroup: currentToy.targetGroup,
    
    userId: this.activeUser?.email || 'guest',
    date: new Date().toISOString(),
    state: 'ordered'
  };

   
    AuthService.createOrder(orderData, currentToy.toyId);

    Alerts.success(`You have successfully booked ${this.quantity} pc. of toy: ${currentToy.name}`);
    
 
    this.router.navigate(['/cart']);
  }

  updateTotal() {
    if (this.quantity < 1) this.quantity = 1;
  }
}