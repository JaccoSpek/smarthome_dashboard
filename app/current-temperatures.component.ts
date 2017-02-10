import { Component, OnInit, OnDestroy }    from '@angular/core';
import { Observable, Subscription }           from 'rxjs/Rx';

import { Sensor }               from './sensor';
import { Measurement }          from './measurement';

import { TemperatureService }   from './temperature.service';

@Component({
    moduleId: module.id,
    selector: 'current-temp',
    templateUrl: 'current-temperatures.component.html'
})
export class CurrentTemperaturesComponent implements OnInit, OnDestroy {
    
    private timerSub: Subscription;
    sensors: Sensor[] = [];
        
    constructor(private temperatureService: TemperatureService){}
    
    ngOnInit(): void {
        this.temperatureService.getSensors().then(sensors =>
            this.startMeasuring(sensors)
        );
    }
    
    ngOnDestroy(): void {
        this.timerSub.unsubscribe();
    }
    
    startMeasuring(sensors: Sensor[]): void {
        // only monitor active sensors
        for(let sensor of sensors){
            if(sensor.active){
                this.sensors.push(sensor)
            }
        }
        
        
        let timer = Observable.timer(0,5000);
        this.timerSub = timer.subscribe(t =>
            this.getMeasurements()
        );
    }
    
    getMeasurements(): void {
        for(let sensor of this.sensors){
            this.temperatureService.getMeasurement(sensor).then(measurement =>
                this.setMeasurement(measurement)
            );
        }
    }
    
    setMeasurement(measurement: Measurement): void {
        for(let i in this.sensors){
            if(this.sensors[i].id == measurement.sensor){
                this.sensors[i].measurement = measurement;
            }
        }
    }
    
}