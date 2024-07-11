package ram0973.web.service;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ram0973.web.dto.PagedArticlesResponseDto;
import ram0973.web.dto.PagedPersonsResponseDto;
import ram0973.web.dto.PersonCreateRequestDto;
import ram0973.web.dto.PersonUpdateRequestDto;
import ram0973.web.exceptions.ForbiddenOperationException;
import ram0973.web.exceptions.NoSuchEntityException;
import ram0973.web.mappers.PersonMapper;
import ram0973.web.model.Article;
import ram0973.web.model.Person;
import ram0973.web.repository.ArticleRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${custom.admin.email}")
    private String adminEmail;

    private Optional<PagedArticlesResponseDto> getPagedArticlesResponseDto(@NotNull Page<Article> pagedArticles) {
        List<Person> Persons = pagedArticles.getContent();
        if (Persons.isEmpty()) {
            return Optional.empty();
        } else {
            PagedPersonsResponseDto PagedPersonsResponseDto = new PagedPersonsResponseDto(Persons, pagedArticles.getNumber(),
                pagedArticles.getTotalElements(), pagedArticles.getTotalPages());
            return Optional.of(PagedPersonsResponseDto);
        }
    }

    public void savePerson(@NotNull Person person) {
        articleRepository.save(person);
    }

    public Optional<PagedPersonsResponseDto> findAll(int page, int size, String[] sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(PagedEntityUtils.getSortOrders(sort)));
        Page<Person> pagedPersons = articleRepository.findAll(pageable);
        return getPagedPersonsResponseDto(pagedPersons);
    }

    public Optional<Person> findById(int id) {
        return articleRepository.findById(id);
    }

    public Optional<Person> findPersonByEmailIgnoreCase(String email) {
        return articleRepository.findByEmailIgnoreCase(email);
    }

    public Optional<Person> createPerson(@NotNull PersonCreateRequestDto dto) {
        Person person = PersonMapper.INSTANCE.personFromPersonRequestDto(dto);
        person.setPassword(passwordEncoder.encode(person.getPassword()));
        return Optional.of(articleRepository.save(person));
    }

    public void deletePerson(int id) {
        Person person = findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such Person with id: " + id));
        if (person.getEmail().equals(adminEmail)) {
            throw new ForbiddenOperationException("You cannot delete admin account");
        }
        articleRepository.deleteById(id);
    }

    public Optional<Person> updatePerson(int id, @NotNull PersonUpdateRequestDto dto) {
        Person person = articleRepository.findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such Person with id: " + id));
        PersonMapper.INSTANCE.update(person, dto);
        return Optional.of(articleRepository.save(person));
    }
}
