import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export const getPokemons = createAsyncThunk(
  "getPokemons",
  async (offset: number) => {
    const result = await axios.get<AxiosResponse<Pokemon[]>>(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${
        offset !== 1 ? (offset - 1) * 20 : 0
      }`
    );
    const pokemons = await result.data.results;
    const pages = Math.ceil(result.data.count / 20);
    console.log(pokemons, pages);
    return { pokemons, pages };
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemons: <Pokemon[]>[],
    pages: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getPokemons.fulfilled.type,
      (
        state,
        action: PayloadAction<{ pokemons: Pokemon[]; pages: number }>
      ) => {
        console.log(action.payload);
        state.pokemons = action.payload.pokemons;
        state.pages = action.payload.pages;
      }
    );
  },
});

export default pokemonSlice.reducer;
