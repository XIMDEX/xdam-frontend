import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { XDamModule } from 'projects/xdam/src/public_api';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    XDamModule,
    BrowserModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
