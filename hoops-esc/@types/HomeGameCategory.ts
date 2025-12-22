import { GamesType } from "./GamesType";

export interface HomeGameWithCategory extends GamesType {
  HomeGames_category_fkey?: {
    Name: string;
  };
}
