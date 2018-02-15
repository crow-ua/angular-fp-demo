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
        <nav-item
	  (navigate)="closeSidenav()"
	  *ngIf="loggedIn$ | async"
	  routerLink="/"
	  icon="person_add"
	  hint="Characted Sheet"
	>
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
  showSidenav$ = this.store.select(state => state.layout.showSidenav);
  loggedIn$ = this.store.select(fromAuth.getLoggedIn);

  constructor(private store: Store<fromRoot.State>) {}

  closeSidenav() {
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
