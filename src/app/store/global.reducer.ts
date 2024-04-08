import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

export interface GlobalSchema {
  isLoading: boolean;
}

export const GLOBAL_FEATURE_KEY = 'global';

export const globalAction = createAction(
  '[Global] isLoading',
  props<{ isLoading: boolean }>()
);
export const selectGlobalLoadingFeature =
  createFeatureSelector<GlobalSchema>(GLOBAL_FEATURE_KEY);

export const selectGlobalLoading = createSelector(
  selectGlobalLoadingFeature,
  (state) => state.isLoading
);

const initialState: GlobalSchema = {
  isLoading: false,
};

export const globalReducer = createReducer(
  initialState,
  on(globalAction, (state, { isLoading }: any) => ({
    ...state,
    isLoading,
  }))
);
