package ram0973.web.dto;

import ram0973.web.model.Person;

import java.util.List;

public record PagedPersonsResponseDto(List<Person> person, int currentPage, long totalItems, int totalPages) {
}
