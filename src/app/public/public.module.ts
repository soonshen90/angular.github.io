import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { Ng2TelInputModule } from "ng2-tel-input";

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    Ng2TelInputModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class PublicModule { }
