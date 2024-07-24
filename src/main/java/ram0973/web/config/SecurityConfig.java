package ram0973.web.config;

import com.zaxxer.hikari.HikariDataSource;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.web.server.Cookie;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.RememberMeAuthenticationProvider;
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
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HeaderWriterLogoutHandler;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.authentication.rememberme.RememberMeAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
//import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter;
import ram0973.web.filters.CsrfCookieFilter;
import ram0973.web.filters.SpaWebFilter;
import ram0973.web.repository.PersonRepository;
import ram0973.web.service.PersonDetailsService;

import javax.sql.DataSource;

import static org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter.Directive.COOKIES;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
@Log4j2
public class SecurityConfig {
    //final PersonDetailsService personDetailsService;
    //final PersonRepository personRepository;
    final RememberMeServices rememberMeServices;

    @Bean
    public AuthenticationManager authenticationManager(
        UserDetailsService userDetailsService,
        PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(authenticationProvider);
    }

    @Bean
    protected SecurityFilterChain filterChain(@NotNull HttpSecurity http) throws Exception {
        final CsrfTokenRequestAttributeHandler spaCsrfTokenRequestHandler = new SpaCsrfTokenRequestHandler();
        final CookieCsrfTokenRepository cookieCsrfTokenRepository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        cookieCsrfTokenRepository.setCookieCustomizer((x) -> x.sameSite(Cookie.SameSite.STRICT.attributeValue()));
        log.error("REMEMBERME: {}", rememberMeServices);
        http
            .anonymous(AbstractHttpConfigurer::disable)
            //.addFilterAfter(new SpaWebFilter(), BasicAuthenticationFilter.class)
            .sessionManagement(o -> o
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )
            .authorizeHttpRequests(o -> o
                .requestMatchers("/error").permitAll()
                .requestMatchers(HttpMethod.POST,"/api/v1/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET,"/api/v1/auth/**").permitAll()
                .requestMatchers("/api/v1/persons/**").authenticated()
                .requestMatchers("/api/v1/articles/**").authenticated()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                .anyRequest().permitAll()
            )
            .rememberMe(o -> o
                //.key(rememberMeKey)
                //.alwaysRemember(true)
                //.tokenValiditySeconds(3600)
                //.userDetailsService(personDetailsService)
                .rememberMeServices(rememberMeServices)
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
                .csrfTokenRepository(cookieCsrfTokenRepository)
                .csrfTokenRequestHandler(spaCsrfTokenRequestHandler)
            )
            .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
            .addFilterAfter(new SpaWebFilter(), CsrfCookieFilter.class)
            .cors(Customizer.withDefaults())
            .httpBasic(AbstractHttpConfigurer::disable)
            .formLogin(AbstractHttpConfigurer::disable)
            //.logout(o -> o.deleteCookies("JSESSIONID"))
            //.logout(o -> o.addLogoutHandler(new HeaderWriterLogoutHandler(new ClearSiteDataHeaderWriter(COOKIES))))
            //.exceptionHandling(o -> o.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
        ;
        return http.build();
    }

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
