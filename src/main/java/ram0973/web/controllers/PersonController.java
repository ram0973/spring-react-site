package ram0973.web.controllers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ram0973.web.dto.persons.PagedPersonsResponseDto;
import ram0973.web.dto.persons.PersonCreateRequestDto;
import ram0973.web.dto.persons.PersonUpdateRequestDto;
import ram0973.web.exceptions.EntityAlreadyExistsException;
import ram0973.web.exceptions.EntityPersistActionException;
import ram0973.web.exceptions.NoSuchEntityException;
import ram0973.web.model.Person;
import ram0973.web.service.PersonService;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/persons")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Log4j2
public class PersonController {
    private final PersonService personService;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagedPersonsResponseDto> getPersons(
        @RequestParam(required = false) String title,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id,desc") String[] sort
    ) {
        PagedPersonsResponseDto pagedPersonsResponseDTO = personService.findAll(page, size, sort).orElse(
            new PagedPersonsResponseDto(Collections.emptyList(), 0, 0, 0)
        );
        return ResponseEntity.ok(pagedPersonsResponseDTO);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Person> getPersonById(@PathVariable("id") int id) {
        Person person = personService.findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such person with id: " + id));
        return ResponseEntity.ok(person);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Person> createPerson(@Valid @RequestBody @NotNull PersonCreateRequestDto dto) {
        Optional<Person> optionalPerson = personService.findPersonByEmailIgnoreCase(dto.email());
        if (optionalPerson.isPresent()) {
            throw new EntityAlreadyExistsException("Email already in use");
        } else {
            Person person = personService.createPerson(dto).orElseThrow(
                () -> new EntityPersistActionException("Error while create Person: " + dto));
            return ResponseEntity.ok(person);
        }
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Person> updatePerson(
        @PathVariable("id") int id, @Valid @RequestBody PersonUpdateRequestDto dto) {
        Person person = personService.updatePerson(id, dto).orElseThrow(
            () -> new EntityPersistActionException(
                String.format("Error while update Person with id: %d and body: %s", id, dto)));
        return ResponseEntity.ok(person);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deletePerson(@PathVariable("id") int id) {
        personService.deletePerson(id);
        return ResponseEntity.ok(null);
    }
}
