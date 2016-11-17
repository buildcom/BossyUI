import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { TextAreaModule } from './text-area.module';
import { MasksAndServicesTestbedModule } from './masks-and-services-testbed.module';

platformBrowserDynamic().bootstrapModule(AppModule);
platformBrowserDynamic().bootstrapModule(TextAreaModule);
platformBrowserDynamic().bootstrapModule(MasksAndServicesTestbedModule);
