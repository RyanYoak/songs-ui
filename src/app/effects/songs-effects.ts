import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

import * as appActions from '../actions/app.actions';
import * as songsActions from '../actions/song-actions';
import { map, switchMap } from "rxjs/operators";
import { SongEntity } from "../reducers/songs.reducer";

@Injectable()
export class SongsEffects {

  loadSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(songsActions.loadSongData),
      switchMap(() => this.client.get<GetSongsResponse>(environment.baseUrl + 'songs')
        .pipe(
          map(response => response.data),
          map(data => songsActions.loadSongsDataSucceeded({ payload: data }))
        )
      )
    ), { dispatch: true })

  // Whent he application starts we should load the songs
  // appStarted -> LoadSongs

  // appStarted -> loadSongs
  appStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => songsActions.loadSongData())
    )
  )

  constructor(private actions$: Actions, private client: HttpClient) { }
}

interface GetSongsResponse {
  data: SongEntity[]
}
