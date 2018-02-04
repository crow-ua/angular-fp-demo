import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromAuth from '../../auth/reducers';
import { openSidenav, closeSidenav } from '../actions/layout';
import * as Auth from '../../auth/actions/auth';

@Component({
  selector: 'app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <layout>
      <sidenav [open]="showSidenav$ | async">
        <nav-item (navigate)="closeSidenav()" *ngIf="loggedIn$ | async" routerLink="/" icon="person_add" hint="Characted Sheet">
          Create Character
        </nav-item>
        <nav-item (navigate)="closeSidenav()" *ngIf="!(loggedIn$ | async)">
          Sign In
        </nav-item>
        <nav-item (navigate)="logout()" *ngIf="loggedIn$ | async">
          Sign Out
        </nav-item>
      </sidenav>
      <toolbar (openMenu)="openSidenav()">
        FP Demo
      </toolbar>

      <router-outlet></router-outlet>
    </layout>
  `,
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(closeSidenav());
  }

  openSidenav() {
    this.store.dispatch(openSidenav());
  }

  logout() {
    this.closeSidenav();

    this.store.dispatch(new Auth.Logout());
  }
}
