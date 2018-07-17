import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCirclePage } from './add-circle';

@NgModule({
  declarations: [
    AddCirclePage,
  ],
  imports: [
    IonicPageModule.forChild(AddCirclePage),
  ],
})
export class AddCirclePageModule {}
