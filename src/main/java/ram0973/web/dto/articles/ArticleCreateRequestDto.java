package ram0973.web.dto.articles;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record ArticleCreateRequestDto(
    @NotNull @NotBlank String title,
    @NotNull @NotBlank String slug,
    MultipartFile image,
    String excerpt,
    String content,
    Boolean enabled
) {
}
