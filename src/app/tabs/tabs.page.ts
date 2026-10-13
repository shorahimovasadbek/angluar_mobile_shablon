import { Component } from '@angular/core';
import { IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular';
import { LucideHouse, LucideUser } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrl: 'tabs.page.scss',
  imports: [IonTabs, IonTabBar, IonTabButton, IonLabel, LucideHouse, LucideUser, TranslatePipe],
})
export class TabsPage {}
