import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './Components/cart/cart.component';
import { DeliveryInformationComponent } from './Components/delivery-information/delivery-information.component';
import { HomeComponent } from './Components/home/home.component';
import { OrderDetailComponent } from './Components/order-detail/order-detail.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';
import { ProfileComponent } from './Components/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  // { path: 'home/product/:id', redirectTo: 'product/:id' },
  { path: 'cart/product/:id', redirectTo: 'product/:id'},
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'delivery-information', component: DeliveryInformationComponent },
  { path: 'cart/delivery-information', redirectTo: 'delivery-information'},
  { path: 'orders', component: OrdersComponent},
  { path: 'orders/order-detail/:id', component: OrderDetailComponent},
  { path: 'order-detail/:id', component: OrderDetailComponent},
  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
