import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrbitService {

    astrariumBodiesUrl = 'http://localhost:5000/bodies';
    astrariumOrbitsUrl = 'http://localhost:5000/orbits';
    
    constructor( private http: HttpClient) { }

    getBodies(): Observable<any> {
        return this.http.get(this.astrariumBodiesUrl);
    }

    getOrbits(): Observable<any> {
        return this.http.get(this.astrariumOrbitsUrl);
    }
}
