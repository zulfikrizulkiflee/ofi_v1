import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderInfoPage } from './order-info';

@NgModule({
  declarations: [
    OrderInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderInfoPage),
  ],
})
export class OrderInfoPageModule {}
