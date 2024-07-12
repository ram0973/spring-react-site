package ram0973.web.dto.articles;

import ram0973.web.model.Article;

import java.util.List;

public record PagedArticlesResponseDto(List<Article> articles, int currentPage, long totalItems, int totalPages) {
}
