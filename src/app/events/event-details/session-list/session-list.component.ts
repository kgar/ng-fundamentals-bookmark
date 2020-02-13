import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISession } from '../../shared';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from '../voter.service';

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

  constructor(public auth: AuthService, private voterService: VoterService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name'
        ? this.visibleSessions.sort(sortByNameAsc)
        : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
  }

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(session, this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(session, this.auth.currentUser.userName);
    }
    if (this.sortBy === 'votes') {
      this.visibleSessions.sort(sortByVotesDesc);
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
