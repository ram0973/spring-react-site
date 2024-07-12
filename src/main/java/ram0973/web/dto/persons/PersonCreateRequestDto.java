package ram0973.web.dto.persons;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PersonCreateRequestDto(
    boolean enabled,
    //boolean credentialsNonExpired,
    //boolean accountNonExpired,
    //boolean nonLocked,
    //@DateTimeFormat String dateCreated,
    @NotNull @NotBlank String email,
    @NotNull
    @NotBlank
    @Size(min = 8, message = "Password length is too short")
    @Size(max = 64, message = "Password length is too large")
    String password
    //Set<Role> roles
) {
}
