import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersApiService } from '../services/users-api.service';
import { Store } from '@ngrx/store';
import { userActions } from './user.actions';
import { catchError, delay, map, of, switchMap, take, tap } from 'rxjs';
import { LocalStorageService } from '../services/local-storage-service';
import { User } from '../models/user';
import { globalAction } from '../../store/global.reducer';

export const loadUserEffect$ = createEffect(
  (
    api = inject(UsersApiService),
    store = inject(Store),
    actions$ = inject(Actions),
    localStorageService = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(userActions.loadUsers),
      tap(() => store.dispatch(globalAction({ isLoading: true }))),
      delay(400),
      switchMap(() =>
        (localStorageService.getItem('users') || []).length !== 0
          ? of(
              userActions.loadUsersSuccess({
                users: localStorageService.getItem('users'),
              })
            )
          : api.getUsers().pipe(
              map((res) => {
                return userActions.loadUsersSuccess({ users: res });
              }),
              catchError((error) => of(userActions.loadUsersFailed({ error }))),
              tap((res: any) => localStorageService.setItem('users', res.users))
            )
      ),
      tap(() => store.dispatch(globalAction({ isLoading: false })))
    ),
  { functional: true }
);

export const deleteUserEffect$ = createEffect(
  (
    api = inject(UsersApiService),
    store = inject(Store),
    actions$ = inject(Actions),
    localStorageService = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(userActions.deleteUserSuccess),
      tap((res) => {
        console.log(res);

        const users: User[] = localStorageService.getItem('users') || [];

        if (users.length !== 0) {
          localStorageService.setItem(
            'users',
            users.filter((user: User) => user.id !== res.user.id)
          );
        }
      })
    ),
  { functional: true, dispatch: false }
);

export const createUserEffect$ = createEffect(
  (
    api = inject(UsersApiService),
    store = inject(Store),
    actions$ = inject(Actions),
    localStorageService = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(userActions.createUserSuccess),
      tap((res) => {
        localStorageService.setItem('users', [
          ...(localStorageService.getItem('users') || []),
          res.user,
        ]);
      })
    ),
  { functional: true, dispatch: false }
);

export const editUserEffect$ = createEffect(
  (
    api = inject(UsersApiService),
    store = inject(Store),
    actions$ = inject(Actions),
    localStorageService = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(userActions.editUserSuccess),
      tap((res) => {
        const users: User[] = localStorageService.getItem('users') || [];
        if (users.length !== 0) {
          localStorageService.setItem(
            'users',
            users.map((user) => (user.id === res.user.id ? res.user : user))
          );
        }
      })
    ),
  { functional: true, dispatch: false }
);
