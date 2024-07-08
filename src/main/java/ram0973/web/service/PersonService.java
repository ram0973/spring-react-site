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
import ram0973.web.dto.PagedPersonsResponseDto;
import ram0973.web.dto.PersonEnableRequestDto;
import ram0973.web.dto.PersonRequestDto;
import ram0973.web.exceptions.ForbiddenOperationException;
import ram0973.web.exceptions.NoSuchEntityException;
import ram0973.web.mappers.PersonMapper;
import ram0973.web.model.Person;
import ram0973.web.repository.PersonRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PersonService {

    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${custom.admin.email}")
    private String adminEmail;

    private Optional<PagedPersonsResponseDto> getPagedPersonsResponseDto(@NotNull Page<Person> pagedPersons) {
        List<Person> Persons = pagedPersons.getContent();
        if (Persons.isEmpty()) {
            return Optional.empty();
        } else {
            PagedPersonsResponseDto PagedPersonsResponseDto = new PagedPersonsResponseDto(Persons, pagedPersons.getNumber(),
                pagedPersons.getTotalElements(), pagedPersons.getTotalPages());
            return Optional.of(PagedPersonsResponseDto);
        }
    }

    public void savePerson(@NotNull Person person) {
        personRepository.save(person);
    }

    public Optional<PagedPersonsResponseDto> findAll(int page, int size, String[] sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(PagedEntityUtils.getSortOrders(sort)));
        Page<Person> pagedPersons = personRepository.findAll(pageable);
        return getPagedPersonsResponseDto(pagedPersons);
    }

    public Optional<Person> findById(int id) {
        return personRepository.findById(id);
    }

    public Optional<Person> findPersonByEmailIgnoreCase(String email) {
        return personRepository.findByEmailIgnoreCase(email);
    }

    public Optional<Person> createPerson(@NotNull PersonRequestDto dto) {
        Person person = PersonMapper.INSTANCE.personFromPersonRequestDto(dto);
        person.setPassword(passwordEncoder.encode(person.getPassword()));
        return Optional.of(personRepository.save(person));
    }

    public void deletePerson(int id) {
        Person person = findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such Person with id: " + id));
        if (person.getEmail().equals(adminEmail)) {
            throw new ForbiddenOperationException("You cannot delete admin");
        }
        personRepository.deleteById(id);
    }

    public Optional<Person> patchPersonEnable(int id, @NotNull PersonEnableRequestDto dto) {
        Person person = personRepository.findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such Person with id: " + id));
        person.setEnabled(dto.enable());
        return Optional.of(personRepository.save(person));
    }

    public Optional<Person> updatePerson(int id, @NotNull PersonRequestDto dto) {
        Person person = personRepository.findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such Person with id: " + id));
        PersonMapper.INSTANCE.update(person, dto);
        return Optional.of(personRepository.save(person));
    }
}
