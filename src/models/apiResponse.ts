import { Pokemon } from "./pokemon";

export type ApiResponse = {
  [key: string]: Pokemon[] | number | undefined;
  count?: number;
};
