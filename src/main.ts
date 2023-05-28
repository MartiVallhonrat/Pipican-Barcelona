/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGl2YWxsIiwiYSI6ImNsaTRyNzVqMjBvZHozbW96M3A4ZWV3ZnUifQ.qh5ODQ2KdPNMlYeLWkiXdg';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
