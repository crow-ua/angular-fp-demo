import { Injectable } from '@angular/core';

// Another way to write down your actions, avoiding classes

export const FORM = {
  UPDATE: '[Char Form] Update',
};

export const updateForm = ({path, formValue}) => ({
  type: FORM.UPDATE,
  payload: {path, formValue}
});
