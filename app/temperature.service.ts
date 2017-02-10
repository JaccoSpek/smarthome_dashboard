import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Sensor } from './sensor';
import { Measurement } from './measurement';

@Injectable()
export class TemperatureService {
    
    private apiUrl = "http://localhost:9080/smarthome";
    //private apiUrl = "http://192.168.178.12/smarthome";
    
    private headers = new Headers({'Content-Type': 'application/json'});
    
    constructor(private http: Http) {}
    
    getSensors(): Promise<Sensor[]> {
        const url = `${this.apiUrl}/sensors/`;
        return this.http.get(url).toPromise()
                    .then(response => response.json() as Sensor[])
                    .catch(this.handleError);
    }
    
    connectedSensors(): Promise<Sensor[]> {
        const url = `${this.apiUrl}/sensors/connected/`;
        return this.http.get(url).toPromise()
                    .then(response => response.json() as Sensor[])
                    .catch(this.handleError);
    }
    
    getMeasurement(sensor: Sensor): Promise<Measurement> {
        const url = `${this.apiUrl}/sensors/${sensor.id}/measurement/`;
        return this.http.get(url).toPromise()
                    .then(response => response.json() as Measurement)
                    .catch(this.handleError);
    }
    
    getHistory(sensor: Sensor, start_date: string, end_date: string): Promise<Measurement[]> {
        const url = `${this.apiUrl}/sensors/${sensor.id}/log/start/${start_date}/end/${end_date}`;
        return this.http.get(url).toPromise()
                    .then(response => response.json() as Measurement[])
                    .catch(this.handleError);
    }
    
    updateSensor(sensor: Sensor): Promise<Sensor> {
        const url = `${this.apiUrl}/sensors/${sensor.id}`;
        return this.http.put(url, JSON.stringify(sensor), {headers: this.headers})
                    .toPromise()
                    .then(response => response.json() as Sensor)
                    .catch(this.handleError);
    }
    
    saveSensor(sensor: Sensor): Promise<Sensor> {
        const url = `${this.apiUrl}/sensors/`;
        return this.http.post(url, JSON.stringify(sensor), {headers: this.headers})
                    .toPromise()
                    .then(response => response.json() as Sensor)
                    .catch(this.handleError);
    }
    
    saveSensors(sensors: Sensor[]): Promise<Sensor[]> {
        const url = `${this.apiUrl}/sensors/`;
        return this.http.put(url, JSON.stringify(sensors), {headers: this.headers})
                    .toPromise()
                    .then(response => response.json() as Sensor[])
                    .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}