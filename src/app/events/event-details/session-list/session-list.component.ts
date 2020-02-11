import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISession } from '../../shared';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css'],
})
export class SessionListComponent implements OnInit, OnChanges {
  @Input() filterBy: string;
  @Input() sortBy: string;
  @Input() sessions: ISession[];
  visibleSessions: ISession[];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name'
        ? this.visibleSessions.sort(sortByNameAsc)
        : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  filterSessions(filter) {
    if (filter === 'all') {
      this.visibleSessions = [...this.sessions];
    } else {
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
  return s1.name > s2.name ? 1 : s1.name === s2.name ? 0 : -1;
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
