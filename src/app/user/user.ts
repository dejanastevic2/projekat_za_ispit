import { Component, signal } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ToyType } from '../models/toy.model';
import { ToyService } from '../services/toy.service';
import { Loading } from '../loading/loading';
import { Alerts } from '../alerts';

@Component({
  selector: 'app-user',
  imports: [MatCardModule, MatInputModule,MatButtonModule,MatIconModule,FormsModule,MatSelectModule,Loading],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  
  public activeUser=AuthService.getActiveUser()
  favorites = signal<ToyType[]>([]);
  public oldPassword=''
  public newPassword=''
  public repeatPassword=''
  
 constructor( private router: Router){
    if(!AuthService.getActiveUser()){
      router.navigate(['/login'])
      return
    }
    ToyService.getToyType()
    .then(rsp=>this.favorites.set(rsp.data))
  }
  getAvatarUrl() {
    return `https://ui-avatars.com/api/?name=${this.activeUser?.firstName}+${this.activeUser?.lastName}`;
  }
  updateUser(){
    Alerts.confirm('Are you sure you user info?',
      ()=> {
    AuthService.updateActiveUser(this.activeUser!)
    Alerts.success('User updated successfuly')
      })
  }
  updatePassword(){
    Alerts.confirm('Are you sure you want to change password?',
      ()=> {
         if(this.oldPassword != this.oldPassword ){
      Alerts.error("Invalid old password!")
      return
    }
    if(this.newPassword.length<6){
      Alerts.error('Passwords must be at least 6 characters long')
      return
    }
    if (this.newPassword!=this.repeatPassword){
      Alerts.error('Passwords dont match')
      return;
    }
    if(this.newPassword==this.activeUser?.password){
      Alerts.error('New password cant be the same as the old one')
      return
    }
    AuthService.updateActiveUserPassword(this.newPassword)
    Alerts.success('Password is sucessfully changed')
    AuthService.logout()
    this.router.navigate(['/login'])
      })
   
  }
}
