import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-orbit',
  templateUrl: './orbit.component.html',
  styleUrls: ['./orbit.component.scss']
})


export class OrbitComponent implements OnInit {

    @Input() body: string;
    @Input() barycentre: string;
    @Input() argPeriapsis: number;
    @Input() eccentricity: number;
    @Input() epochTrueAnomaly: number;
    @Input() inclination: number;
    @Input() longAscNode: number;
    @Input() semiMajorAxis: number;

    
    constructor() { }

    ngOnInit() {
    }

}
