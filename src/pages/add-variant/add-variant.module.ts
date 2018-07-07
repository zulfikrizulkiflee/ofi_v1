import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddVariantPage } from './add-variant';

@NgModule({
  declarations: [
    AddVariantPage,
  ],
  imports: [
    IonicPageModule.forChild(AddVariantPage),
  ],
})
export class AddVariantPageModule {}
