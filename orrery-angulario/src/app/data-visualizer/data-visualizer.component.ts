import { Component, OnInit } from '@angular/core';
import { OrbitService } from '../orbit.service';

@Component({
  selector: 'app-data-visualizer',
  templateUrl: './data-visualizer.component.html',
  styleUrls: ['./data-visualizer.component.scss']
})
export class DataVisualizerComponent implements OnInit {
    orbits;
    bodies;
    
    constructor(private orbitService: OrbitService) { }

    ngOnInit() {
        this.getOrbits();
        this.getBodies();
    }
    
    getOrbits(): void {
        this.orbitService.getOrbits()
            .subscribe(orbits => this.orbits = orbits.results);
    }

    getBodies(): void {
        this.orbitService.getBodies()
            .subscribe(bodies => {
                this.bodies = bodies.results;
                this.orderByBarycenter();
            });
    }

    orderByBarycenter(): void {
        this.orbits.sort( (a,b) => a.barycentre - b.barycentre);
    }

    getBodyName(bodyId: number): string {
        for(let i in this.bodies) {
            const body = this.bodies[i];
            if(body.id === bodyId)
                return body.name;
        }
        return 'unknown';
    }

}
