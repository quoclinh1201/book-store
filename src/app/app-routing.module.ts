import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
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
  { path: 'cart/product/:id', redirectTo: 'product/:id'},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'delivery-information', component: DeliveryInformationComponent, canActivate: [AuthGuard] },
  { path: 'cart/delivery-information', redirectTo: 'delivery-information'},
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  { path: 'orders/order-detail/:id', component: OrderDetailComponent, canActivate: [AuthGuard]},
  { path: 'order-detail/:id', component: OrderDetailComponent, canActivate: [AuthGuard]},
  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
