import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_KEY, UserSchema } from './user.reducer';

export const selectUserState = createFeatureSelector<UserSchema>(USER_KEY);

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUserStatus = createSelector(
  selectUserState,
  (state) => state.userStatus
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);
