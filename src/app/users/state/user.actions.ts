import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user';

export const userActions = createActionGroup({
  source: 'USER',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ users: User[] }>(),
    loadUsersFailed: props<{ error: Error }>(),

    deleteUser: emptyProps(),
    deleteUserSuccess: props<{ user: User }>(),
    deleteUserFailed: props<{ error: Error }>(),

    createUser: emptyProps(),
    createUserSuccess: props<{ user: User }>(),
    createUserFailed: props<{ error: Error }>(),

    editUser: emptyProps(),
    editUserSuccess: props<{ user: User }>(),
    editUserFailed: props<{ error: Error }>(),
  },
});
