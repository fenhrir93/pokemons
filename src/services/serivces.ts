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
        url: "pokemon",
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
        if (
          Array.isArray(currentCacheData.results) &&
          Array.isArray(responseData.results)
        ) {
          currentCacheData?.results.push(...responseData.results);
        }
      },

      forceRefetch: ({ previousArg, currentArg }) => {
        return previousArg !== currentArg;
      },
    }),
    getPokemonByName: build.query({
      query: (name: string) => ({ url: `pokemon/${name}` }),
    }),
    getPokemonsType: build.query<ApiResponse, void>({
      query: () => ({ url: "type" }),
    }),
    getTypedPokemons: build.query<ApiResponse, string>({
      query: (pokemonType: string) => {
        return {
          url: `type/${pokemonType}`,
        };
      },
      transformResponse: (rawResult: { pokemon: Pokemon[] }) => {
        const { pokemon } = rawResult;
        return { pokemon };
      },
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonByNameQuery,
  useGetPokemonsTypeQuery,
  useGetTypedPokemonsQuery,
} = pokemonApi;
export default pokemonApi;
