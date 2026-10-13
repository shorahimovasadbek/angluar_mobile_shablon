import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Auth } from '@core/auth/auth';
import { UiPage } from '@shared/ui/ui-page/ui-page';

@Component({
  selector: 'app-home-page',
  imports: [UiPage, TranslatePipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  protected readonly auth = inject(Auth);
}
