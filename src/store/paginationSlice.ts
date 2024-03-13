import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// export const getPokemons = createAsyncThunk(
//   "getPokemons",
//   async (offset: number) => {
//     const result = await axios.get<AxiosResponse<Pokemon[]>>(
//       `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${
//         offset !== 1 ? (offset - 1) * 20 : 0
//       }`
//     );
//     const pokemons = (await result.data.results) as Pokemon[];
//     const itemsLength = result.data.count;
//     const hasMore = !!result.data?.next;
//     console.log(hasMore);
//     return { pokemons, itemsLength, hasMore };
//   }
// );

// export const pokemonSlice = createSlice({
//   name: "pokemon",
//   initialState: {
//     pokemons: <Pokemon[]>[],
//     itemsLength: 0,
//     hasMore: false,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(
//       getPokemons.fulfilled.type,
//       (
//         state,
//         action: PayloadAction<{ pokemons: Pokemon[]; itemsLength: number }>
//       ) => {
//         console.log(action.payload);
//         state.pokemons = state.pokemons.concat(...action.payload.pokemons);
//         console.log(state.pokemons.concat(...action.payload.pokemons));
//         state.itemsLength = action.payload.itemsLength;
//       }
//     );
//   },
// });

// export default pokemonSlice.reducer;

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    page: 0,
    offset: 0,
    limit: 20,
  },
  reducers: {
    setOffset: (state) => {
      const offset = state.page * 20;
      state.offset = offset;
      state.page = ++state.page;
    },

    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
});
export const { setLimit, setOffset } = paginationSlice.actions;
export default paginationSlice.reducer;
