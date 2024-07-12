package ram0973.web.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import ram0973.web.dto.articles.ArticleCreateRequestDto;
import ram0973.web.dto.articles.ArticleUpdateRequestDto;
import ram0973.web.model.Article;


@Mapper
public interface ArticleMapper {
    ArticleMapper INSTANCE = Mappers.getMapper(ArticleMapper.class);

    //@Mapping(source = "numberOfSeats", target = "seatCount")

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "image", ignore = true)
    Article from(ArticleCreateRequestDto dto);

    @Mapping(target = "id", ignore = true)
    void update(@MappingTarget Article article, ArticleUpdateRequestDto dto);
}
