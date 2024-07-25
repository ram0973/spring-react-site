package ram0973.web.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
import ram0973.web.service.PersistentTokenRememberMeServices;

import javax.sql.DataSource;

@Configuration
@RequiredArgsConstructor
class RememberMeServicesConfig {
    @Value("${custom.security.remember-me.key}")
    private String rememberMeKey;
    private final DataSource dataSource;
    private final JdbcTokenRepositoryImpl jdbcTokenRepository;
    private final UserDetailsService userDetailsService;
    private final PersistentTokenRememberMeServices rememberMe;
    @Bean
    RememberMeServices rememberMeServices() {
//        TokenBasedRememberMeServices.RememberMeTokenAlgorithm encodingAlgorithm =
//            TokenBasedRememberMeServices.RememberMeTokenAlgorithm.SHA256;
//        TokenBasedRememberMeServices rememberMe = new TokenBasedRememberMeServices(
//            rememberMeKey, userDetailsService, encodingAlgorithm);
        //var rememberMe = new PersistentTokenBasedRememberMeServices(
        //    rememberMeKey, userDetailsService, jdbcTokenRepository);
        //rememberMe.setMatchingAlgorithm(TokenBasedRememberMeServices.RememberMeTokenAlgorithm.SHA256);
        rememberMe.setAlwaysRemember(true);
        rememberMe.setTokenValiditySeconds(3600 * 24 * 365);
        return rememberMe;
    }
}