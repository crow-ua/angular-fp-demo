import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import * as char from '../actions/char';
import { Char } from '../models/char';

@Component({
  selector: 'create-char-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>Character Sheet</mat-card-title>
      <mat-card-content>
	<char-form (submit)="submit($event)"></char-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      position: absolute;
      left: 25%;
      right: 25%;
    }

    mat-card-title {
      text-align: center;
    }
  `]
})
export class CreateCharPageComponent {
  char$: Observable<Char[]>;

  constructor(private store: Store<any>) {}

  submit(value) {
    console.log(value);
  }
}
