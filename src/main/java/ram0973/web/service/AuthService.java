package ram0973.web.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;
import ram0973.web.dto.LoginRequestDto;
import ram0973.web.dto.RegisterRequestDto;
import ram0973.web.exceptions.EmailAlreadyInUseException;
import ram0973.web.model.Person;
import ram0973.web.model.Role;
import ram0973.web.repository.PersonRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final SecurityContextRepository securityContextRepository;
    private final AuthenticationManager authManager;
    private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
    private final PasswordEncoder passwordEncoder;
    private final PersonRepository personRepository;

    private final SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    @Value("${custom.admin.email}")
    private String adminEmail;

    public Person register(RegisterRequestDto dto) {
        String email = dto.email().trim();
        Optional<Person> personExists = personRepository.findByEmail(email);
        if (personExists.isPresent()) {
            throw new EmailAlreadyInUseException("Person with such email: " + email + " already exists");
        }
        Person person = new Person();
        person.setEmail(email);
        person.setPassword(passwordEncoder.encode(dto.password()));
        person.setNonLocked(true);
        person.setAccountNonExpired(true);
        person.setCredentialsNonExpired(true);
        person.setEnabled(true);
        person.addRole(Role.ROLE_USER);
        if (adminEmail.equals(email)) {
            person.addRole(Role.ROLE_ADMIN);
        }
        personRepository.save(person);
        return person;
    }

    /**
     * After an employee is authenticated via the auth manager, I am manually storing the authentication
     * For a better understanding, click the link below
     * <a href="https://docs.spring.io/spring-security/reference/servlet/authentication/session-management.html">...</a>
     *
     * @param dto      is a record. It accepts email and password
     * @param request  of type HttpServletRequest
     * @param response of type HttpServletResponse
     * @return String
     **/
    public Authentication login(LoginRequestDto dto, HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(
            dto.email().trim(), dto.password());
        Authentication authentication = this.authManager.authenticate(token);
        if (!authentication.isAuthenticated()) {
            throw new BadCredentialsException("Bad credentials");
        }

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);

        this.securityContextHolderStrategy.setContext(context);
        this.securityContextRepository.saveContext(context, request, response);

        return authentication;
    }

    public void logout(@NotNull Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        this.logoutHandler.setClearAuthentication(true);
        this.logoutHandler.setInvalidateHttpSession(true);
        this.logoutHandler.setSecurityContextHolderStrategy(securityContextHolderStrategy);
        this.logoutHandler.setSecurityContextRepository(securityContextRepository);
        this.logoutHandler.logout(request, response, authentication);
    }
}
