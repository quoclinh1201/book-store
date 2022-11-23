import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SearchComponent } from './Components/search/search.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';
import { ProductOverviewComponent } from './Components/product-overview/product-overview.component';
import { ProductInformationComponent } from './Components/product-information/product-information.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ChooseDeliveryComponent } from './Components/choose-delivery/choose-delivery.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { DeliveryInformationComponent } from './Components/delivery-information/delivery-information.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { OrderDetailComponent } from './Components/order-detail/order-detail.component';
import { AddDeliveryComponent } from './Components/add-delivery/add-delivery.component';
import { CommonUtils } from './Common/CommonUtils';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    ProductCardComponent,
    HomeComponent,
    ProductDetailComponent,
    ProductOverviewComponent,
    ProductInformationComponent,
    CartComponent,
    CheckoutComponent,
    ChooseDeliveryComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ChangePasswordComponent,
    DeliveryInformationComponent,
    OrdersComponent,
    OrderDetailComponent,
    AddDeliveryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    CommonUtils,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('679247113780136'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
