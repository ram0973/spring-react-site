package ram0973.web.config;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.logout.HeaderWriterLogoutHandler;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter;
import ram0973.web.filters.CsrfCookieFilter;
import ram0973.web.filters.SpaWebFilter;

import ram0973.web.service.PersonDetailsService;

import javax.sql.DataSource;

import static org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter.Directive.COOKIES;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    PersonDetailsService personDetailsService;

    DataSource dataSource;

    @Value("${custom.security.remember-me.key}")
    private String rememberMeKey;


    PersistentTokenRepository persistentTokenRepository;

    @Bean
    protected SecurityFilterChain filterChain(@NotNull HttpSecurity http) throws Exception {
        CsrfTokenRequestAttributeHandler spaCsrfTokenRequestHandler = new SpaCsrfTokenRequestHandler();
        // set the name of the attribute the CsrfToken will be populated on
        //spaCsrfTokenRequestHandler.setCsrfRequestAttributeName(null);

        http
            .anonymous(AbstractHttpConfigurer::disable)
            //.addFilterAfter(new SpaWebFilter(), BasicAuthenticationFilter.class)
            .sessionManagement(o -> o
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
            )
            .authorizeHttpRequests(o -> o
                .requestMatchers("/error").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/auth/**").permitAll()
                //.requestMatchers("/api/v1/persons/**").authenticated()
                //.requestMatchers("/api/v1/articles/**").authenticated()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                .anyRequest().permitAll()
            )
//            .rememberMe(o -> o
//                .key(rememberMeKey)
//                .tokenRepository(persistentTokenRepository)
//                .userDetailsService(personDetailsService)
//                .tokenValiditySeconds(60 * 60 * 24 * 365)
//                .alwaysRemember(true)
//            )
//            .rememberMe(o -> o
//                .rememberMeServices(rememberMeServices)
//                .userDetailsService(personDetailsService)
//                .tokenRepository((org.springframework.security.web.authentication.rememberme.PersistentTokenRepository) tokenRepository)
//                .tokenValiditySeconds(60 * 60 * 24 * 365)
//                .alwaysRemember(true)
//                //.useSecureCookie(true)
//                .key(rememberMeKey)
//            )
            //.csrf(o -> o.disable())

            .csrf((csrf) -> csrf
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .csrfTokenRequestHandler(spaCsrfTokenRequestHandler)
            )
            .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
            .cors(Customizer.withDefaults()) // o -> o.disable())
            //.cors(o -> o.disable())
            .httpBasic(o -> o.disable())
            .formLogin(o -> o.disable())
            //.logout(o -> o.deleteCookies("JSESSIONID").permitAll())
            .logout(o -> o.addLogoutHandler(new HeaderWriterLogoutHandler(new ClearSiteDataHeaderWriter(COOKIES))))
            .exceptionHandling(o -> o.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
        ;
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
        UserDetailsService userDetailsService,
        PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(authenticationProvider);
    }

//    @Bean
//    public UserDetailsService userDetailsService() {
//        UserDetails admin = User.builder()
//            .username("ramil@yabbarov.ru")
//            .password("{noop}password")
//            .roles("ADMIN")
//            .build();
//        UserDetails user = User.builder()
//            .username("user@yabbarov.ru")
//            .password("{noop}password")
//            .roles("USER")
//            .build();
//
//        return new InMemoryUserDetailsManager(admin, user);
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /**
     * A SecurityContextRepository implementation which stores the security context in the HttpSession between requests.
     */
    @Bean
    public SecurityContextRepository securityContextRepository() {
        return new HttpSessionSecurityContextRepository();
    }
}
