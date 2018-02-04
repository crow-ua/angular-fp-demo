import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material';

import { CharFormComponent } from './char-form.component';
import { ConnectFormDirective } from './connect-form.directive';

export const COMPONENTS = [
  CharFormComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    ...COMPONENTS,
    ConnectFormDirective
  ],
  exports: COMPONENTS,
})
export class ComponentsModule {}
