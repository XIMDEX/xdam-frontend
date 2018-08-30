import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {DamModule} from './../lib/dam'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    DamModule,
    BrowserModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
