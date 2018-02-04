import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';

import { CreateCharPageComponent } from './containers/create-char-page.component';
import { MaterialModule } from '../material';

import { charReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'create', pathMatch: 'full' },
      { path: 'create', component: CreateCharPageComponent }
    ]),
    StoreModule.forFeature('char', charReducer),
    EffectsModule.forFeature([])
  ],
  declarations: [
    CreateCharPageComponent,
  ],
  providers: []
})
export class CharModule {}
