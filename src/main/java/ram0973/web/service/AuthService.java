package ram0973.web.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;
import ram0973.web.dto.auth.LoginRequestDto;
import ram0973.web.dto.auth.RegisterRequestDto;
import ram0973.web.exceptions.EntityAlreadyExistsException;
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
    private final TokenBasedRememberMeServices tokenBasedRememberMeServices;

    private final SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
    private final PersonService personService;
    //private final PersistentTokenRememberMeServices rememberMeServices;

    @Value("${custom.admin.email}")
    private String adminEmail;

    public Person register(RegisterRequestDto dto) {
        String email = dto.email().trim();
        Optional<Person> personExists = personRepository.findByEmailIgnoreCase(email);
        if (personExists.isPresent()) {
            throw new EntityAlreadyExistsException("Person already exist with such email: " + email);
        }
        Person person = new Person();
        person.setEmail(email);
        person.setPassword(passwordEncoder.encode(dto.password()));
        person.addRole(Role.ROLE_USER);
        if (adminEmail.equals(email)) {
            person.addRole(Role.ROLE_ADMIN);
        }
        personService.savePerson(person);
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
     **/
    public Authentication login(LoginRequestDto dto, HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(
            dto.email().trim(), dto.password());
        Authentication authentication = this.authManager.authenticate(token);
        if (!authentication.isAuthenticated()) {
            throw new BadCredentialsException("Invalid username or password");
        }

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);

        this.securityContextHolderStrategy.setContext(context);
        this.securityContextRepository.saveContext(context, request, response);

        tokenBasedRememberMeServices.loginSuccess(request, response, authentication);

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
