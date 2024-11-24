import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { ApiModule, Configuration, ConfigurationParameters } from '../generated';
import { provideHttpClient } from '@angular/common/http';

const apiConfParams: ConfigurationParameters = {
  basePath: 'http://localhost:4200/',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    importProvidersFrom(
      ApiModule.forRoot(() => new Configuration(apiConfParams))
    ),
  ],
};
