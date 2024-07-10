package ram0973.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PersonUpdateRequestDto(
    boolean enabled,
    //boolean credentialsNonExpired,
    //boolean accountNonExpired,
    //boolean nonLocked,
    //@DateTimeFormat String dateCreated,
    @NotNull @NotBlank String email
    //Set<Role> roles
) {
}
