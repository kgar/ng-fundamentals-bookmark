import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ToastService } from '../common/toastr.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'events-list',
  templateUrl: './events-list.component.html',
})
export class EventsListComponent implements OnInit {
  events: any[];

  constructor(private eventService: EventService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.events = this.eventService.getEvents();
  }

  handleThumbnailClick(name: string) {
    this.toastService.success(name);
  }
}
