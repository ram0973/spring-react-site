package ram0973.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import ram0973.web.dto.PersonRequestDto;
import ram0973.web.model.Person;


@Mapper
public interface PersonMapper {
    PersonMapper INSTANCE = Mappers.getMapper(PersonMapper.class);

    //@Mapping(source = "numberOfSeats", target = "seatCount")
    @Mapping(target = "id", ignore = true)
    Person personFromPersonRequestDto(PersonRequestDto personRequestDto);

    @Mapping(target = "id", ignore = true)
    void update(@MappingTarget Person person, PersonRequestDto personRequestDto);
}
