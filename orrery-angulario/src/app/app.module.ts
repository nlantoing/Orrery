import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataVisualizerComponent } from './data-visualizer/data-visualizer.component';
import { OrbitComponent } from './orbit/orbit.component';
import { HttpClientModule }    from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DataVisualizerComponent,
    OrbitComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
