package ram0973.web.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import ram0973.web.model.Person;
import ram0973.web.model.Role;
import ram0973.web.repository.ArticleRepository;
import ram0973.web.repository.PersonRepository;

import java.time.LocalDateTime;
import java.util.Set;

@Configuration
@Log4j2
@RequiredArgsConstructor
public class DbSeedConfig {
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initDatabase(PersonRepository personRepository, ArticleRepository articleRepository) {
        return args -> {
            log.info("Preloading Users");

            Person gendalf = new Person();
            gendalf.setEnabled(true);
            gendalf.setDateCreated(LocalDateTime.now());
            gendalf.setEmail("gendalf@white.com");
            gendalf.setPassword(passwordEncoder.encode("password"));
            gendalf.setArticles(null);
            gendalf.addRole(Role.ROLE_ADMIN);
            personRepository.save(gendalf);

            Person frodo = new Person();
            frodo.setEnabled(true);
            frodo.setDateCreated(LocalDateTime.now());
            frodo.setEmail("frodo@baggins.com"); //gendalf@white.com
            frodo.setPassword(passwordEncoder.encode("password"));
            frodo.setArticles(null);
            frodo.addRole(Role.ROLE_MODERATOR);
            personRepository.save(frodo);

            Person bilbo= new Person();
            bilbo.setEnabled(true);
            bilbo.setDateCreated(LocalDateTime.now());
            bilbo.setEmail("bilbo@baggins.com"); //gendalf@white.com
            bilbo.setPassword(passwordEncoder.encode("password"));
            bilbo.setArticles(null);
            bilbo.addRole(Role.ROLE_USER);
            personRepository.save(bilbo);

//            log.info("Preloading Articles");
//            ThreadLocalRandom random = ThreadLocalRandom.current();
//            for (int i = 1; i < 40; i++) {
//                Article article = new Article();
//                article.setTitle(String.format("Article №%d", i));
//                article.setExcerpt("Excerpt");
//                article.setContent("Content");
//                article.setImage("/images/1.jpg");
//                article.setUser(gendalf);
//                article.setState(ArticleState.ENABLED);
//                article.setDateCreated(LocalDateTime.now().minusDays(random.nextInt(40)));
//                articleRepository.save(article);
//            }
        };
    }
}
