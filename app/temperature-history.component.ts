import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable }           from 'rxjs/Rx';

import { Sensor }               from './sensor';
import { Measurement }          from './measurement';

import { TemperatureService }   from './temperature.service';

declare var moment: any;

@Component({
    moduleId: module.id,
    selector: 'temp-history',
    templateUrl: 'temperature-history.component.html'
})
export class TemperatureHistoryComponent implements OnInit {
    private sensors: Sensor[] = [];
     
    table_type = 'line';
    table_options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            'millisecond': 'HH:mm',
                            'second': 'HH:mm',
                            'minute': 'HH:mm',
                            'hour': 'HH:mm',
                            'day': 'HH:mm',
                            'week': 'HH:mm',
                            'month': 'HH:mm',
                            'quarter': 'HH:mm',
                            'year': 'HH:mm',
                            }
                        }
                    }],
        }
    };
    
    constructor(private temperatureService: TemperatureService){}
    
    start_date: string = moment().subtract(1,'days').format('YYYY-MM-DDTHH:mm');
    end_date: string = moment().format('YYYY-MM-DDTHH:mm');
    
    ngOnInit(): void {
        this.temperatureService.getSensors().then(sensors =>
            this.getHistories(sensors)
        );
        
    }
        
    getHistories(sensors: Sensor[]): void {
        this.sensors = sensors;
        for(let sensor of this.sensors){
            this.temperatureService.getHistory(sensor, this.start_date, this.end_date).then(measurements =>
                this.setHistories(sensor.id, measurements)
            );
        }
    }
    
    setHistories(sensor_id: number, measurements: Measurement[]): void {
        for(let i in this.sensors){
            if(this.sensors[i].id == sensor_id){
                this.sensors[i].table_data = this.formatData(this.sensors[i].display_name, measurements);
            }
        }
    }
    
    formatData(sensor_name: string, measurements: Measurement[]): any {
        let labels: string[] = [];
        let data: number[] = [];
        
        let numPoints: number = 50;
        let divider: number = Math.floor(measurements.length/numPoints);
        divider = (divider == 0) ? 1 : divider;
        measurements.forEach(function(value, i){
            if(i%divider == 0 || i == measurements.length-1){
                labels.push(measurements[i].timestamp);
                data.push(measurements[i].value);
            }
        });           
        
        return {
            labels: labels,
            datasets: [
                {
                    label: sensor_name,
                    data: data,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 0.5,
                    pointHitRadius: 10,
                }
            ]  
        };
      
    }
    
}