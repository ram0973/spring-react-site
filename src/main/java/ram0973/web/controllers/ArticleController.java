package ram0973.web.controllers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ram0973.web.dto.*;
import ram0973.web.exceptions.EntityAlreadyExistsException;
import ram0973.web.exceptions.EntityPersistActionException;
import ram0973.web.exceptions.NoSuchEntityException;
import ram0973.web.model.Article;
import ram0973.web.model.Person;
import ram0973.web.service.ArticleService;
import ram0973.web.service.PersonService;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/articles")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Log4j2
public class ArticleController {
    private final ArticleService articleService;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagedArticlesResponseDto> getArticles(
        @RequestParam(required = false) String title,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id,desc") String[] sort
    ) {
        ArticleUpdateRequestDto pagedArticlesResponseDTO = articleService.findAll(page, size, sort).orElse(
            new PagedArticlesResponseDto(Collections.emptyList(), 0, 0, 0)
        );
        return ResponseEntity.ok(pagedArticlesResponseDTO);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Article> getArticleById(@PathVariable("id") int id) {
        Article article = articleService.findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such Article with id: " + id));
        return ResponseEntity.ok(Article);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Article> createArticle(@Valid @RequestBody @NotNull ArticleCreateRequestDto dto) {
        Optional<Article> optionalArticle = articleService.findArticleBySlug(dto.slug());
        if (optionalArticle.isPresent()) {
            throw new EntityAlreadyExistsException("Slug already in use");
        } else {
            Article article = articleService.createArticle(dto).orElseThrow(
                () -> new EntityPersistActionException("Error while create Article: " + dto));
            return ResponseEntity.ok(article);
        }
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Article> updateArticle(@PathVariable("id") int id,
                                                 @Valid @RequestBody ArticleUpdateRequestDto dto) {
        Person person = articleService.updateArticle(id, dto).orElseThrow(
            () -> new EntityPersistActionException(
                String.format("Error while update Article with id: %d and body: %s", id, dto)));
        return ResponseEntity.ok(article);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteArticle(@PathVariable("id") int id) {
        articleService.deleteArticle(id);
        return ResponseEntity.ok(null);
    }
}
