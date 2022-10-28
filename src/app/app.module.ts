import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CompanyComponent } from './company/company.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StockComponent } from './stock/stock.component';
//import {MatSidenavModule} from '@angular/material/sidenav';
// import { AngularFireModule} from '@angular/fire/compat';
// import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
    // ,
    // AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [], 
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
