import { createFeature, createReducer, on } from '@ngrx/store';
import { userActions } from './user.actions';
import { User } from '../models/user';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const USER_KEY = 'user';

export interface UserSchema {
  users: User[];
  userStatus: 'init' | 'loading' | 'loaded' | 'failed';
  error: string;
}

const initialState: UserSchema = {
  users: JSON.parse(localStorage.getItem('users') as any) || [],
  userStatus: 'init',
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(userActions.loadUsers, (state) => {
    return {
      ...state,
      authStatus: 'loading' as const,
    };
  }),

  on(userActions.loadUsersSuccess, (state, { users }: any) => {
    return {
      ...state,
      users,
      authStatus: 'loaded' as const,
    };
  }),

  on(userActions.loadUsersFailed, (state, { error }: any) => ({
    ...state,
    authStatus: 'failed' as const,
    error: error.message,
  })),

  on(userActions.deleteUser, (state) => ({
    ...state,
    userStatus: 'loading' as const,
  })),
  on(userActions.deleteUserSuccess, (state, { user }: any) => ({
    ...state,
    users: state.users.filter((u) => u.id !== user.id),
    userStatus: 'loaded' as const,
  })),

  on(userActions.deleteUserFailed, (state, { error }: any) => ({
    ...state,
    userStatus: 'loaded' as const,
    error: error.message,
  })),

  on(userActions.createUserSuccess, (state, { user }: any) => ({
    ...state,
    users: [...state.users, user],
    userStatus: 'loaded' as const,
  })),

  on(userActions.editUserSuccess, (state, { user }: any) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
    userStatus: 'loaded' as const,
  }))
);
