import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from '../features/Auth';

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
