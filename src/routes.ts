import { Routes } from '@angular/router';
import {
  EventsListComponent,
  CreateEventComponent,
  EventListResolver,
  EventDetailsComponent,
  EventRouteActivator,
} from './app/events/index';
import { NotFoundComponent } from './app/errors/not-found.component';

export const appRoutes: Routes = [
  { path: 'events', component: EventsListComponent, resolve: { events: EventListResolver } },
  {
    path: 'events/new',
    component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent'],
  },
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator] },
  { path: 'not-found', component: NotFoundComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./app/user/user.module').then(m => m.UserModule) },
];
