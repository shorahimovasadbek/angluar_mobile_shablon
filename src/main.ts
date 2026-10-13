import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { inject, provideAppInitializer } from '@angular/core';
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { provideLucideConfig } from '@lucide/angular';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { Auth } from '@core/auth/auth';
import { DEFAULT_LANG, Lang } from '@core/i18n/lang';
import { apiInterceptor } from '@core/interceptors/api.interceptor';
import { errorInterceptor } from '@core/interceptors/error.interceptor';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
    provideHttpClient(withInterceptors([apiInterceptor, errorInterceptor])),
    provideLucideConfig({ size: 24, strokeWidth: 1.75 }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: './assets/i18n/', suffix: '.json' }),
      fallbackLang: DEFAULT_LANG,
    }),
    provideAppInitializer(async () => {
      const auth = inject(Auth);
      const lang = inject(Lang);
      try {
        await Promise.all([auth.restore(), lang.restore()]);
        if (auth.isAuthed()) void auth.refreshMe().catch(() => undefined);
      } finally {
        await SplashScreen.hide();
      }
    }),
  ],
});
