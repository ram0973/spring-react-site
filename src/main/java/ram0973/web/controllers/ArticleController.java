package ram0973.web.controllers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import ram0973.web.dto.articles.ArticleCreateRequestDto;
import ram0973.web.dto.articles.ArticleUpdateRequestDto;
import ram0973.web.dto.articles.PagedArticlesResponseDto;
import ram0973.web.exceptions.EntityPersistActionException;
import ram0973.web.exceptions.NoSuchEntityException;
import ram0973.web.model.Article;
import ram0973.web.service.ArticleService;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Calendar;
import java.util.Collections;
import java.util.TimeZone;

@RestController
@RequestMapping(name = "/api/v1/articles/")
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
        PagedArticlesResponseDto pagedArticlesResponseDTO = articleService.findAll(page, size, sort).orElse(
            new PagedArticlesResponseDto(Collections.emptyList(), 0, 0, 0)
        );
        return ResponseEntity.ok(pagedArticlesResponseDTO);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Article> getArticleById(@PathVariable("id") int id) {
        Article article = articleService.findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such article with id: " + id));
        return ResponseEntity.ok(article);
    }

    public static Path getResourceAsFile(String relativeFilePath) throws FileNotFoundException {
        return ResourceUtils.getFile(ResourceUtils.CLASSPATH_URL_PREFIX + relativeFilePath).toPath();
    }

    @PostMapping(""/*, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }*/)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Article> createArticle(@NotNull @Valid @RequestBody ArticleCreateRequestDto dto) throws IOException {
        log.error(dto);
//        Optional<Article> optionalArticle = articleService.findArticleBySlug(dto);
//        if (optionalArticle.isPresent()) {
//            throw new EntityAlreadyExistsException("Article with this slug exists already");
//        } else {
//            //Article article = articleService.createArticle(dto).orElseThrow(
//            //    () -> new EntityPersistActionException("Error while create Article: " + dto));
//            return ResponseEntity.ok(dto);
//        }
        //Article article = articleService.createArticle(dto);
        Article article = new Article();
        if (dto.image() != null && dto.image().getOriginalFilename() != null) {
            Path root = getResourceAsFile("static/upload/images");
            String originalFileName = dto.image().getOriginalFilename();
            String originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf('.') + 1);
            Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
            String year = String.valueOf(cal.get(Calendar.YEAR));
            String month = String.valueOf(cal.get(Calendar.MONTH) + 1);
            String day = String.valueOf(cal.get(Calendar.DAY_OF_MONTH));

            Path pathWithDate = Files.createDirectories(Path.of(root.toString(), year, month, day));
            Path newFilePath = Files.createTempFile(pathWithDate, "", "." + originalFileExtension);

            dto.image().transferTo(newFilePath);
            article.setImage(newFilePath.toString());
        }
        return ResponseEntity.ok(article);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Article> updateArticle(@PathVariable("id") int id,
                                                 @Valid @RequestBody ArticleUpdateRequestDto dto) {
        Article article = articleService.updateArticle(id, dto).orElseThrow(
            () -> new EntityPersistActionException(
                String.format("Error while update article with id: %d and body: %s", id, dto)));
        return ResponseEntity.ok(article);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteArticle(@PathVariable("id") int id) {
        articleService.deleteArticle(id);
        return ResponseEntity.ok(null);
    }
}
