import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'char-form',
  templateUrl: 'char-form.component.html',
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
