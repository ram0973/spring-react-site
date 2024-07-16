package ram0973.web.service;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ram0973.web.dto.articles.ArticleCreateRequestDto;
import ram0973.web.dto.articles.ArticleUpdateRequestDto;
import ram0973.web.dto.articles.PagedArticlesResponseDto;
import ram0973.web.exceptions.NoSuchEntityException;
import ram0973.web.mappers.ArticleMapper;
import ram0973.web.model.Article;
import ram0973.web.repository.ArticleRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    private Optional<PagedArticlesResponseDto> getPagedArticlesResponseDto(@NotNull Page<Article> pagedArticles) {
        List<Article> articles = pagedArticles.getContent();
        if (articles.isEmpty()) {
            return Optional.empty();
        } else {
            PagedArticlesResponseDto pagedArticlesResponseDto = new PagedArticlesResponseDto(
                articles, pagedArticles.getNumber(), pagedArticles.getTotalElements(), pagedArticles.getTotalPages());
            return Optional.of(pagedArticlesResponseDto);
        }
    }

    public Optional<PagedArticlesResponseDto> findAll(int page, int size, String[] sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(PagedEntityUtils.getSortOrders(sort)));
        Page<Article> pagedArticles = articleRepository.findAll(pageable);
        return getPagedArticlesResponseDto(pagedArticles);
    }

    public Optional<Article> findById(int id) {
        return articleRepository.findById(id);
    }

    public Optional<Article> findArticleBySlug(@NotNull String slug) {
        return articleRepository.findBySlug(slug);
    }

    public Optional<Article> createArticle(@NotNull ArticleCreateRequestDto dto) throws IOException {
        Article article = ArticleMapper.INSTANCE.from(dto);
        if (dto.image() != null && dto.image().getOriginalFilename() != null) {
            String newImagePath = MultiPartFileUtils.saveMultiPartImage(dto.image());
            article.setImage(newImagePath);
        }
        return Optional.of(articleRepository.save(article));
    }

    public void deleteArticle(int id) {
        Article article = findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such Article with id: " + id));
        articleRepository.deleteById(id);
    }

    public Optional<Article> updateArticle(int id, @NotNull ArticleUpdateRequestDto dto) {
        Article article = articleRepository.findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such Article with id: " + id));
        ArticleMapper.INSTANCE.update(article, dto);
        return Optional.of(articleRepository.save(article));
    }
}
