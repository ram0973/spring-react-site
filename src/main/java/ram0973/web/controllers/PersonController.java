package ram0973.web.controllers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ram0973.web.dto.PagedPersonsResponseDto;
import ram0973.web.dto.PersonEnableRequestDto;
import ram0973.web.dto.PersonRequestDto;
import ram0973.web.exceptions.EntityAlreadyExistsException;
import ram0973.web.exceptions.EntityPersistActionException;
import ram0973.web.exceptions.NoSuchEntityException;
import ram0973.web.model.Person;
import ram0973.web.service.PersonService;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/person")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PersonController {
    private final PersonService personService;

    @GetMapping("/all")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagedPersonsResponseDto> getPersons(
        @RequestParam(required = false) String title,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id,desc") String[] sort
    ) {
        PagedPersonsResponseDto pagedPersonsResponseDTO = personService.findAll(page, size, sort).orElseThrow(
            () -> new NoSuchEntityException("No such Persons"));
        return ResponseEntity.ok(pagedPersonsResponseDTO);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Person> getPersonById(@PathVariable("id") int id) {
        Person Person = personService.findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such Person with id: " + id));
        return ResponseEntity.ok(Person);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Person> createPerson(@Valid @RequestBody @NotNull PersonRequestDto personRequestDto) {
        Optional<Person> optionalPerson = personService.findPersonByEmailIgnoreCase(personRequestDto.email());
        if (optionalPerson.isPresent()) {
            throw new EntityAlreadyExistsException("Email already in use");
        } else {
            Person Person = personService.createPerson(personRequestDto).orElseThrow(
                () -> new EntityPersistActionException("Error while create Person: " + personRequestDto));
            return ResponseEntity.ok(Person);
        }
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Person> updatePerson(@PathVariable("id") int id, @Valid @RequestBody PersonRequestDto personRequestDto) {
        Person Person = personService.updatePerson(id, personRequestDto).orElseThrow(
            () -> new EntityPersistActionException(
                String.format("Error while update Person with id: %d and body: %s", id, personRequestDto)));
        return ResponseEntity.ok(Person);
    }

    @PatchMapping("{id}/enable")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Person> patchPersonEnable(@PathVariable("id") int id,
                                                    @Valid @RequestBody PersonEnableRequestDto personEnableRequestDto) {
        Person Person = personService.patchPersonEnable(id ,personEnableRequestDto).orElseThrow(
            () -> new EntityPersistActionException(
                String.format("Error while change enable state for Person with id: %d", id)));
        return ResponseEntity.ok(Person);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deletePerson(@PathVariable("id") int id) {
        // JPA Repository throws EmptyResultDataAccessException if such id is not exist
        personService.deletePerson(id);
        return ResponseEntity.ok(null);
    }
}
