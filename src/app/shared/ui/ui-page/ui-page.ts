import { Component, booleanAttribute, input } from '@angular/core';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

/** Har bir sahifa uchun umumiy karkas: header + back + content */
@Component({
  selector: 'ui-page',
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent],
  templateUrl: './ui-page.html',
  styleUrl: './ui-page.scss',
  host: { '[class.no-header]': '!header()' },
})
export class UiPage {
  readonly title = input('');
  readonly back = input<string | null>(null);
  readonly header = input(true, { transform: booleanAttribute });
}
