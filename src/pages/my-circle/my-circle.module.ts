import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCirclePage } from './my-circle';

@NgModule({
  declarations: [
    MyCirclePage,
  ],
  imports: [
    IonicPageModule.forChild(MyCirclePage),
  ],
})
export class MyCirclePageModule {}
