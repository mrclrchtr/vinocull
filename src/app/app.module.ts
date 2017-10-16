/* tslint:disable:no-console */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, isDevMode} from '@angular/core';

import {Logger} from 'angular2-logger/core';
import {AppComponent} from './app.component';
import {MapValuesPipe} from './util/map-values.pipe';
import {environment} from '../environments/environment';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MapValuesPipe
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [Logger, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private logger: Logger) {
    if (isDevMode()) {
      console.info('To see debug logs enter: \'logger.level = logger.Level.DEBUG;\' in your browser console');
    }
    this.logger.level = environment.logger.level;
  }
}
