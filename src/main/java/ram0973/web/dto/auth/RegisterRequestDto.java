package ram0973.web.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequestDto(@NotNull @NotBlank(message = "Email cannot be empty") @Email String email,
                                 @NotNull @NotBlank(message = "Password cannot be empty") String password) {
}
