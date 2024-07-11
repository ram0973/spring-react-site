package ram0973.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ArticleCreateRequestDto(
    boolean enabled
    //@DateTimeFormat String dateCreated,
) {
}
