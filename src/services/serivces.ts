import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../models/apiResponse";
import { Pokemon } from "../models/pokemon";
import axiosBaseQuery from "./axiosBaseQuery";

const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getPokemons: build.query<ApiResponse, number>({
      query: (offset: number) => ({
        url: "",
        method: "get",
        params: {
          limit: 20,
          offset: offset * 20,
        },
      }),
      transformResponse: (rawResult: { results: Pokemon[]; count: number }) => {
        const { count, results } = rawResult;
        return { count, results };
      },

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCacheData, responseData) => {
        currentCacheData.results.push(...responseData.results);
      },

      forceRefetch: ({ previousArg, currentArg }) => {
        return previousArg !== currentArg;
      },
    }),
    getPokemonDetails: build.query({
      query: (name: string) => ({ url: `/${name}`, method: "get" }),
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = pokemonApi;
export default pokemonApi;
