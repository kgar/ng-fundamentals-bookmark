import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  VoterService,
  LocationValidator,
} from './events/index';

import { NavBarComponent } from './nav/navbar.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import { NotFoundComponent } from './errors/not-found.component';
import { EventsAppComponent } from './events-app.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapsibleWellComponent, TOASTR_TOKEN, JQ_TOKEN, ModalTriggerDirective } from './common';
import { SimpleModalComponent } from './common/simple-modal/simple-modal.component';
import { UpvoteComponent } from './events/event-details/upvote/upvote.component';

let toastr: any = window['toastr'];
let jQuery = window['$'];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), FormsModule, ReactiveFormsModule],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    NotFoundComponent,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    EventRouteActivator,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
    EventListResolver,
    AuthService,
    VoterService
  ],
  bootstrap: [EventsAppComponent],
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
