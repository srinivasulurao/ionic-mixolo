import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SyncCalendarPage } from './sync-calendar';

@NgModule({
  declarations: [
    SyncCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(SyncCalendarPage),
  ],
})
export class SyncCalendarPageModule {}
