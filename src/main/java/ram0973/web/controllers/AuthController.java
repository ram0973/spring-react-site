package ram0973.web.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;
import ram0973.web.dto.auth.LoginRequestDto;
import ram0973.web.dto.auth.RegisterRequestDto;
import ram0973.web.model.Person;
import ram0973.web.service.AuthService;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping(path = "/register")
    public ResponseEntity<Person> register(@Valid @RequestBody RegisterRequestDto dto) {
        Person person = this.authService.register(dto);
        return new ResponseEntity<>(person, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginRequestDto dto, HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = authService.login(dto, request, response);
        //rememberMeServices.loginSuccess(request, response, auth);
        log.info("Person with email: {} has successfully login", dto.email());
        return new ResponseEntity<>("Successfully authenticated", HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        if (authentication != null && authentication.isAuthenticated()) {
            authService.logout(authentication, request, response);
        }
        return new ResponseEntity<>("Logged out", HttpStatus.OK);
    }

    @PostMapping("/me")
    public ResponseEntity<String> profile(Principal principal) {
        if (principal != null) {
            return new ResponseEntity<>(principal.getName(), HttpStatus.OK);
        }
        return new ResponseEntity<>("Principal is null", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/csrf")
    public CsrfResponse csrf(HttpServletRequest request) {
        var csrf = (CsrfToken) request.getAttribute("_csrf");
        return new CsrfResponse(csrf.getToken());
    }

    public record CsrfResponse(String token) {}
}
