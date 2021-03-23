import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions/counter.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class CounterEffects {

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
