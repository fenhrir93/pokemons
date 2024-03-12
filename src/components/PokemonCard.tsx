import { Card, CardContent } from "@mui/joy";
import { FC, ReactNode } from "react";

interface PokemonCardProps {
  className?: string;
  children: ReactNode;
}
export const PokemonCard: FC<PokemonCardProps> = ({ children }) => {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
