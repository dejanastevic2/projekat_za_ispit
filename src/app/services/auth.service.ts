import { Injectable } from '@angular/core';
import { UserModel } from "../models/user.model";

const USERS = 'users';
const ACTIVE = 'active';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {

  static getUsers(): UserModel[] {
    const baseUser: UserModel = {
      email: 'user@example.com',
      firstName: 'Example',
      lastName: 'User',
      password: 'user123',
      phone: '064123456',
      address: 'Ulica 123',
      favorites: 'Muzički tamburina',
      orders: []
    }
    if (localStorage.getItem(USERS) == null) {
      localStorage.setItem(USERS, JSON.stringify([baseUser]))
    }
    return JSON.parse(localStorage.getItem(USERS)!)
  }

  static login(email: string, password: string) {
    const users = this.getUsers()
    for (let u of users) {
      if (u.email === email && u.password === password) {
        localStorage.setItem(ACTIVE, email)
        return true
      }
    }
    return false
  }

  static getActiveUser(): UserModel | null {
    const users = this.getUsers()
    const activeEmail = localStorage.getItem(ACTIVE);
    for (let u of users) {
      if (u.email === activeEmail) {
        return u
      }
    }
    return null
  }

  static updateActiveUser(newUserData: UserModel) {
    const users = this.getUsers()
    const activeEmail = localStorage.getItem(ACTIVE);
    for (let u of users) {
      if (u.email === activeEmail) {
        u.firstName = newUserData.firstName
        u.lastName = newUserData.lastName
        u.address = newUserData.address
        u.phone = newUserData.phone
        u.favorites = newUserData.favorites
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users))
  }

  static updateActiveUserPassword(newPassword: string) {
    const users = this.getUsers()
    const activeEmail = localStorage.getItem(ACTIVE);
    for (let u of users) {
      if (u.email === activeEmail) {
        u.password = newPassword
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users))
  }

  static logout() {
    localStorage.removeItem(ACTIVE)
  }

  static createOrder(order: any, toyId: number) {
    order.toyId = toyId;
    order.state = 'ordered'; 
    order.createdAt = new Date().toISOString();

    const users = this.getUsers();
    const activeEmail = localStorage.getItem(ACTIVE);

    for (let u of users) {
      if (u.email === activeEmail) {
        if (!u.orders) u.orders = []; 
        u.orders.push(order);
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users));
  }

  static getOrdersByState(state: 'ordered' | 'arrived' | 'cancelled') {
    const user = this.getActiveUser();
    if (!user || !user.orders) return [];
    return user.orders.filter((o: any) => o.state === state);
  }

  static cancelOrder(createdAt: string) {
    const users = this.getUsers();
    const activeEmail = localStorage.getItem(ACTIVE);
    for (let u of users) {
      if (u.email === activeEmail && u.orders) {
        for (let o of u.orders) {
          if (o.state === 'ordered' && o.createdAt === createdAt) {
            o.state = 'cancelled';
          }
        }
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users));
  }

  static payOrders() {
    const users = this.getUsers();
    const activeEmail = localStorage.getItem(ACTIVE);
    for (let u of users) {
      if (u.email === activeEmail && u.orders) {
        for (let o of u.orders) {
          if (o.state === 'ordered') {
            o.state = 'arrived';
          }
        }
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users));
  }

  static createUser(userData: UserModel) {
    const users = this.getUsers(); 
    users.push(userData); 
    localStorage.setItem(USERS, JSON.stringify(users)); 
  }

  static existsByEmail(email: string): boolean {
    const users = this.getUsers();
    return users.some(u => u.email === email);
  }


  static rateOrder(createdAt: string, rating: number, review: string) {
    const users = this.getUsers();
    const activeEmail = localStorage.getItem(ACTIVE);
    for (let u of users) {
      if (u.email === activeEmail && u.orders) {
        const order = u.orders.find(o => o.createdAt === createdAt);
        if (order) {
          order.rating = rating;
          order.review = review;
        }
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users));
  }

 
  static deleteArrivedOrder(createdAt: string) {
    const users = this.getUsers();
    const activeEmail = localStorage.getItem(ACTIVE);
    for (let u of users) {
      if (u.email === activeEmail && u.orders) {
        u.orders = u.orders.filter(o => !(o.state === 'arrived' && o.createdAt === createdAt));
      }
    }
    localStorage.setItem(USERS, JSON.stringify(users));
  }
}