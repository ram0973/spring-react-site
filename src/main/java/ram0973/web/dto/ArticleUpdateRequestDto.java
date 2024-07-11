package ram0973.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ArticleUpdateRequestDto(
    boolean enabled
    //@DateTimeFormat String dateCreated
) {
}
