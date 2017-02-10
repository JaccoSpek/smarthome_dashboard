import { Component, OnInit }    from '@angular/core';
import { Observable }           from 'rxjs/Rx';

import { Sensor }               from './sensor';

import { TemperatureService }   from './temperature.service';

@Component({
    moduleId: module.id,
    selector: 'sensors',
    templateUrl: 'sensors.component.html'
})
export class SensorsComponent implements OnInit {
    constructor(private temperatureService: TemperatureService){}
    
    private known_sensors: Sensor[];
    private connected_sensors: Sensor[];
    private sensors: Sensor[];
    
    ngOnInit(): void {
        // get known sensors
        this.temperatureService.getSensors().then(sensors => {
            this.known_sensors = sensors;
            this.setSensorList();
        });
        
        // get connected sensors
        this.temperatureService.connectedSensors().then(sensors => {
            this.connected_sensors = sensors;
            this.setSensorList();
        });
    }
    
    private setSensorList(): void {
       if(this.known_sensors != null && this.connected_sensors != null){
           // copy all known sensors to new variable
           this.sensors = this.known_sensors.slice();
           for(let connected_sensor of this.connected_sensors){
               let new_sensor: boolean = true;
               for(let sensor of this.sensors){
                   if(connected_sensor.sensor_id == sensor.sensor_id){
                       new_sensor = false;
                       break;
                   }
               }
               if(new_sensor){
                   this.sensors.push(connected_sensor);
               }
           }
       }
    }
    
    private saveSensor(sensor:Sensor): void {
        if(sensor.id){
            // update sensor
            this.temperatureService.updateSensor(sensor).then(updated => {
                console.log("updated sensor:",updated);
                
                // rebuild list of sensors
                this.ngOnInit();
            });
        } else {
            // save new sensor
            this.temperatureService.saveSensor(sensor).then(new_sensor => {
                console.log("new sensor:",new_sensor);
                
                // rebuild list of sensors
                this.ngOnInit();
            });
        } 
    }
    
    private saveSensors(sensors:Sensor[]): void {
        this.temperatureService.saveSensors(sensors).then(sensors => {
            console.log("updated sensors:",sensors);
            
            // rebuild list of sensors
            this.ngOnInit();
        });
    }
    
    private detectSensor(): void {
        console.log("TODO: Detect new (local) sensors");
    }
    
    private addSensor(): void {
        console.log("TODO: Add new sensor");
    }
}