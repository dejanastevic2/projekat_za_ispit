import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Details } from './details/details';
import { Login } from './login/login';
import { User } from './user/user';
import { Order } from './order/order';
import { Cart } from './cart/cart';

export const routes: Routes = [
    { path: '', component: Home },
    {path: 'details/:id/order', component: Order}, //ovde bi trebalo details/:id/order
    { path: 'details/:id', component: Details},
    { path: 'cart', component: Cart },
    {path:'login',component: Login},
    {path:'user', component: User},
    

];
