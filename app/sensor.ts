import { Measurement } from './measurement';

export class Sensor {
    id: number;
    sensor_id: string;
    sensor_type: string;
    address: string;
    display_name: string;
    active: boolean;
    measurement: Measurement;
    table_data: any;
}