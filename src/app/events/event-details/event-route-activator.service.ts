import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { EventService } from '../shared/event.service';

@Injectable()
export class EventRouteActivator implements CanActivate{

  constructor(private eventService: EventService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const eventExists = !!this.eventService.getEvent(+route.params['id']);
    if (!eventExists) {
      this.router.navigate(['/not-found']);
    }
    return eventExists;
  }

}
