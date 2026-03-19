import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Details } from './details/details';
import { Login } from './login/login';
import { User } from './user/user';
import { Order } from './order/order';
import { Cart } from './cart/cart';
import { Signup } from './singup/signup';

export const routes: Routes = [
    { path: '', component: Home },
    {path: 'details/:id/order', component: Order}, 
    { path: 'details/:id', component: Details},
    { path: 'cart', component: Cart },
    {path:'login',component: Login},
    {path:'user', component: User},
    {path:'signup', component: Signup},

];
