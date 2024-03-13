import { Pokemon } from "./pokemon";

export interface ApiResponse {
  results: Pokemon[];
  count: number;
}
