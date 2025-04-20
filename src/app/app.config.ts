import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ClerkService } from './service/clerk.service';

function initializeClerk(clerkService: ClerkService): () => Promise<void> {
  return () => clerkService.load();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ClerkService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeClerk,
      deps: [ClerkService],
      multi: true
    }
  ]
};
