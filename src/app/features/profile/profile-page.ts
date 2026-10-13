import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Auth } from '@core/auth/auth';
import { LANGS, Lang } from '@core/i18n/lang';
import { UiButton } from '@shared/ui/ui-button/ui-button';
import { UiPage } from '@shared/ui/ui-page/ui-page';
import { formatPhone, phoneDigits } from '@shared/utils/format';

@Component({
  selector: 'app-profile-page',
  imports: [UiPage, UiButton, TranslatePipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  protected readonly auth = inject(Auth);
  protected readonly lang = inject(Lang);
  protected readonly langs = LANGS;

  protected phone(raw: string): string {
    return '+998 ' + formatPhone(phoneDigits(raw));
  }
}
