package ram0973.web.dto.persons;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

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
