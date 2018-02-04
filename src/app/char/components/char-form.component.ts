import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'char-form',
  template: `
    <form
      [formGroup]="form"
      (submit)="onSubmit($event)"
      connectForm="char">
      <mat-input-container>
	<input
	  type="text"
	  matInput
          placeholder="Name"
	  formControlName="name">
      </mat-input-container>
      <mat-form-field>
	<mat-select
	  placeholder="Sex"
          formControlName="sex">
	  <mat-option *ngFor="let v of sex" [value]="v">
	    {{ v }}
	  </mat-option>
	</mat-select>
      </mat-form-field>
      <mat-form-field>
	<mat-select
	  placeholder="Race"
          formControlName="race">
	  <mat-option *ngFor="let v of races" [value]="v">
	    {{ v }}
	  </mat-option>
	</mat-select>
      </mat-form-field>
      <mat-form-field>
	<mat-select
	  placeholder="Alignment"
          formControlName="alignment">
	  <mat-option *ngFor="let v of alignments" [value]="v">
	    {{ v }}
	  </mat-option>
	</mat-select>
      </mat-form-field>
      <div formGroupName="abilities">
	<mat-input-container *ngFor="let a of abilities">
	  <input
	    type="number"
	    matInput
	    [placeholder]="a"
	    [formControlName]="a">
	</mat-input-container>
      </div>
      <button
	mat-raised-button
	color="primary"
        [disabled]="!form.valid"
        type="submit">
        Create!
      </button>
    </form>
  `,
  styles: [`
    mat-input-container, mat-form-field {
      width: 100%;
    }
  `]
})
export class CharFormComponent implements OnInit {
  @Output() submit = new EventEmitter<any>();

  form: FormGroup;
  sex = ['male', 'female'];
  races = ['human', 'elf', 'dwarf', 'halfling'];
  alignments = ['lawful', 'neutral', 'chaotic'];
  abilities = ['str', 'int', 'wis', 'dex', 'con', 'cha'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const req = [Validators.required];
    this.form = this.fb.group({
      name: ['', req],
      sex: [null, req],
      race: [null, req],
      alignment: [null, req],
      abilities: this.fb.group(
	this.abilities.reduce((r, v) => ({...r, [v]: [18, req]}), {})
      )
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.form.value);
  }
}
