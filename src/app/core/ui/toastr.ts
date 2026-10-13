import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

type ToastKind = 'success' | 'error' | 'info';

/** Xabar matni — tarjima kaliti yoki tayyor matn */
@Injectable({ providedIn: 'root' })
export class Toastr {
  private readonly ctrl = inject(ToastController);
  private readonly t = inject(TranslateService);

  success(msg: string) { return this.show(msg, 'success'); }
  error(msg: string)   { return this.show(msg, 'error'); }
  info(msg: string)    { return this.show(msg, 'info'); }

  private async show(msg: string, kind: ToastKind): Promise<void> {
    await this.ctrl.dismiss().catch(() => undefined);
    const toast = await this.ctrl.create({
      message: this.t.instant(msg),
      duration: kind === 'error' ? 4000 : 2500,
      position: 'top',
      cssClass: ['ui-toast', `ui-toast--${kind}`],
    });
    await toast.present();
  }
}
