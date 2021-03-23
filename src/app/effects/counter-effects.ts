import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions/counter.actions';
import { tap, filter, map } from 'rxjs/operators';
import * as appActions from '../actions/app.actions';

@Injectable()
export class CounterEffects {

  loadCountBy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => localStorage.getItem('by')), // ApplicationStarted -> "1", "3", "5" || null
      filter(val => val !== null), // Nada or the value. "1", "3", "5"
      map(by => parseInt(by, 10)),
      map(by => actions.countBySet({ by }))
    )
    , { dispatch: true }
  );

  //When an action of "some type" happens:
  /// check localStrage for 'by'
  /// if it is there
  /// dispatch an action of type actions.countBySet

  saveCountBy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.countBySet),
      tap(a => localStorage.setItem('by', a.by.toString()))
    )
    , { dispatch: false })

  // logItAll$ = createEffect(() =>
  //   this.actions$.pipe(
  //     tap(action => console.log('Got an action of type: ', action.type))
  //   ), { dispatch: false }
  // )
  constructor(private actions$: Actions) { }
}
