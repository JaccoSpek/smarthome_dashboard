import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }       from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule }     from './app-routing.module';

import { ChartModule } from 'angular2-chartjs';

import { AppComponent }  from './app.component';
import { CurrentTemperaturesComponent } from './current-temperatures.component';
import { TemperatureHistoryComponent } from './temperature-history.component';
import { SensorsComponent } from './sensors.component';

import { TemperatureService } from './temperature.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, AppRoutingModule, ChartModule ],
  declarations: [ AppComponent, CurrentTemperaturesComponent, TemperatureHistoryComponent, SensorsComponent ],
  providers: [ TemperatureService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }