package ram0973.web.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;

import javax.sql.DataSource;

@Configuration
@RequiredArgsConstructor
public class JdbcTokenRepositoryConfig {
    private final DataSource dataSource;

    @Bean
    JdbcTokenRepositoryImpl jdbcTokenRepository() {
        var jdbcTokenRepository = new JdbcTokenRepositoryImpl();
        jdbcTokenRepository.setDataSource(dataSource);
        return jdbcTokenRepository;
    }
}
