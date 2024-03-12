import { Sheet, Table, Typography } from "@mui/joy";
import { Pokemon } from "../models/pokemon";
interface Column {
  id: "moves" | "types";
  label: string;
  minWidth?: number;
  maxHeight?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "moves", label: "Moves" },
  { id: "types", label: "Types" },
];

export const PokemonDetail = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <>
      <Typography
        level="body-md"
        textAlign="center"
        sx={{ mb: 2 }}
        color="neutral"
        fontSize="xl"
        fontWeight="lg"
      >
        {pokemon.name}
      </Typography>
      <Sheet
        sx={{
          height: "60dvh",
          width: "80dvw",
          overflow: "auto",
        }}
        variant="solid"
        invertedColors
      >
        <Table
          variant="outlined"
          borderAxis="bothBetween"
          stickyHeader
          hoverRow
          color="neutral"
          stripe={"odd"}
          sx={{
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  style={{ minWidth: column.minWidth, textAlign: "center" }}
                >
                  <p>{column.label}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pokemon.moves.map((move, index) => (
              <tr key={move.move.name}>
                <td key="moves">{move.move.name}</td>
                <td key="types">
                  {pokemon.types[index]?.type.name
                    ? pokemon.types[index]?.type.name
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
};
