import { Pokemon } from "./pokemon";

export type ApiResponse = {
  [key: string]: Pokemon[] | number | undefined | unknown;
  count?: number;
};
