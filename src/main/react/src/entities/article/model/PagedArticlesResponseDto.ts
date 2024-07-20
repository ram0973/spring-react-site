import {Article} from "./Article.ts";

export interface PagedArticlesResponseDto {
  articles: Article[],
  currentPage: number,
  totalItems: number,
  totalPages: number,
}

