package ram0973.web.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ram0973.web.dto.LoginRequestDto;
import ram0973.web.dto.RegisterRequestDto;
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
        authService.login(dto, request, response);
        return new ResponseEntity<>("Successfully authenticated", HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return new ResponseEntity<>("Not logged in", HttpStatus.BAD_REQUEST);
        }
        authService.logout(authentication, request, response);
        return new ResponseEntity<>("Logged out", HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<String> profile(Principal principal) {
        if (principal != null) {
            return new ResponseEntity<>(principal.getName(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Principal is null", HttpStatus.BAD_REQUEST);
        }
    }
}
