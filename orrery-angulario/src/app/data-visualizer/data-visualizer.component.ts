import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { OrbitService } from '../orbit.service';
import { OrbitComponent } from '../orbit/orbit.component';

@Component({
  selector: 'app-data-visualizer',
  templateUrl: './data-visualizer.component.html',
  styleUrls: ['./data-visualizer.component.scss']
})


export class DataVisualizerComponent implements OnInit {
    orbits: Array<any>;
    bodies: Array<any>;
    
    constructor(private orbitService: OrbitService) { }

    ngOnInit() {
        let orbits$ = this.orbitService.getOrbits();
        let bodies$ = this.orbitService.getBodies();

        forkJoin([orbits$, bodies$]).subscribe(results => {
            this.orbits = results[0].results;
            this.bodies = results[1].results;
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
        console.warn(`Couldn't find body ${bodyId}`);
        return 'unknown';
    }

}
