package ram0973.web.config;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
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
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter;

import static org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter.Directive.COOKIES;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    @Bean
    protected SecurityFilterChain filterChain(@NotNull HttpSecurity http) throws Exception {
        http
            .anonymous(AbstractHttpConfigurer::disable)
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
//                .tokenValiditySeconds(60 * 60 * 24 * 365)
//                .alwaysRemember(true)
//                .useSecureCookie(true)
//                .key("uniqueAndSecret")
//                .rememberMeParameter("rememberMe")
//                .rememberMeCookieDomain("localhost")
//            )
            .csrf(o -> o.disable())
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
