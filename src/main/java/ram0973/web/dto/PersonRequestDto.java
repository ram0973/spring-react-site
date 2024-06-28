package ram0973.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.mapstruct.Mapping;
import org.springframework.format.annotation.DateTimeFormat;
import ram0973.web.model.Role;

import java.util.Set;

public record PersonRequestDto(
    boolean enabled,
    //boolean credentialsNonExpired,
    //boolean accountNonExpired,
    //boolean nonLocked,
    //@DateTimeFormat String dateCreated,
    @NotNull @NotBlank String email
    //@NotNull String password,
    //Set<Role> roles
) {
}
