import { Injectable } from '@angular/core';

// Another way to write down your actions, avoiding classes

export const SIDENAV = {
  OPEN: '[Layout] Open Sidenav',
  CLOSE: '[Layout] Close Sidenav'
};

export const openSidenav = () => ({
  type: SIDENAV.OPEN
});

export const closeSidenav = () => ({
  type: SIDENAV.CLOSE
});
