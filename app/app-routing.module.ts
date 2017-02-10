import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrentTemperaturesComponent } from './current-temperatures.component';
import { TemperatureHistoryComponent } from './temperature-history.component';
import { SensorsComponent } from './sensors.component';

const routes: Routes = [
    { path: '', redirectTo: '/current', pathMatch: 'full' },
    { path: 'current',  component: CurrentTemperaturesComponent },
    { path: 'history',  component: TemperatureHistoryComponent },
    { path: 'sensors',  component: SensorsComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}