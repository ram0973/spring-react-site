package ram0973.web.dto.persons;

import ram0973.web.model.Person;

import java.util.List;

public record PagedPersonsResponseDto(List<Person> persons, int currentPage, long totalItems, int totalPages) {
}
