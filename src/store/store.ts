import { configureStore } from "@reduxjs/toolkit";
import pokemonApi from "../services/serivces";
import paginationReducer from "./paginationSlice";
export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(pokemonApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
