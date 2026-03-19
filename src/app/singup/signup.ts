import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from "@angular/router";
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterLink,
    MatSelectModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  
  user: UserModel = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    password: '',
    favorites: '', 
    orders: []    
  }

  repeat: string = '';

  
  toyTypes = signal<string[]>(['Puzzle', 'Plišane igračke', 'Vozila', 'Edukativne', 'Lutke']);

  constructor(public router: Router) {}

  doSignup() {
    
    if (!this.user.email || !this.user.password || !this.user.firstName || !this.user.favorites) {
      Swal.fire('Error', 'All fields must be filled in!', 'error');
      return;
    }


    if (AuthService.existsByEmail(this.user.email)) {
      Swal.fire('Error', 'This email is already registered!', 'error');
      return;
    }

    if (this.user.password.length < 6) {
      Swal.fire('Error', 'Password must have at least 6 characters!', 'error');
      return;
    }

   
    if (this.user.password !== this.repeat) {
      Swal.fire('Error', 'Passwords do not match!', 'error');
      return;
    }

    
    AuthService.createUser(this.user);
    
    Swal.fire('Success', 'Account created successfully!', 'success').then(() => {
      this.router.navigate(['/login']);
    });
  }
}