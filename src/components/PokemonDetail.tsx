import { ArrowBack } from "@mui/icons-material";
import { Button, Sheet, Table, Typography } from "@mui/joy";
import { FC } from "react";
import { Link } from "react-router-dom";
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

interface PokemonDetailProps {
  data: Pokemon;
  name: string;
}

export const PokemonDetail: FC<PokemonDetailProps> = ({ data, name }) => {
  const onReturnNavigationHandler = () => {
    window.history.back();
  };
  return (
    <>
      <Typography
        level="body-md"
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        color="neutral"
        fontSize="xl"
        fontWeight="lg"
      >
        <Button onClick={onReturnNavigationHandler}>
          <ArrowBack />
        </Button>
        {data.sprites.front_default && (
          <img src={data.sprites.front_default} alt={name} />
        )}
        {name}
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
            {data.moves.map((pokemonMove, index) => {
              return (
                <tr key={pokemonMove.move.name}>
                  <td key="moves">{pokemonMove.move.name}</td>
                  <td key="types">
                    {data.types[index]?.type.name ? (
                      <Link to={`/type/${data.types[index].type.name}`}>
                        {data.types[index]?.type.name}
                      </Link>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
};
