import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { take } from 'rxjs/operators';
import { Directive, EventEmitter, Input, Output,
         OnInit, OnDestroy } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Actions } from '@ngrx/effects';
import { FORM, updateForm } from '../actions/char';

@Directive({
  selector: '[connectForm]'
})
export class ConnectFormDirective implements OnInit, OnDestroy {
  // tslint:disable-next-line
  @Input('connectForm') path: string;
  @Input() debounce = 300;

  formChange: Subscription;

  constructor(private formGroupDirective: FormGroupDirective,
              private actions$: Actions,
              private store: Store<any> ) {}

  ngOnInit() {
    this
      .store
      .select(state => state[this.path])
      .subscribe(val => {
        val ?
          this.formGroupDirective.form.patchValue(val.form, {emitEvent: false}) :
          this.formGroupDirective.form.reset({}, {emitEvent: false});
      });

    this.formChange = this
      .formGroupDirective
      .form
      .valueChanges
      .debounceTime(this.debounce)
      .subscribe(formValue => {
        this.store.dispatch(updateForm({
          path: this.path,
          formValue
        }));
      });
  }

  ngOnDestroy() {
    this.formChange.unsubscribe();
  }
}
