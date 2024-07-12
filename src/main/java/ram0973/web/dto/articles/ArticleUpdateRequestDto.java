package ram0973.web.dto.articles;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ArticleUpdateRequestDto(
    @NotNull @NotBlank String title,
    @NotNull @NotBlank String slug,
    String excerpt,
    String content,
    String image,
    Boolean enabled
) {
}
