import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { DeliveryInformationComponent } from './Components/delivery-information/delivery-information.component';
import { HomeComponent } from './Components/home/home.component';
import { OrderDetailComponent } from './Components/order-detail/order-detail.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';
import { ProfileComponent } from './Components/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductDetailComponent },
  { path: 'cart/product', redirectTo: 'product'},
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'delivery-information', component: DeliveryInformationComponent },
  { path: 'cart/delivery-information', redirectTo: 'delivery-information'},
  { path: 'orders', component: OrdersComponent},
  { path: 'orders/order-detail', component: OrderDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
