package ram0973.web.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Article extends BaseModel {

    @NotNull
    @NotBlank
    @Size(max = 255)
    private String title;

    @Column(unique = true)
    @NotNull
    @NotBlank
    @Size(max = 255)
    private String slug;

    private String excerpt;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String image;

    @Column(name = "article_enabled")
    private boolean enabled = true;

    @ManyToOne
    //@JsonIgnoreProperties({"email", "password", "dateCreated", "roles"})
    //@JsonInclude
    //@JoinColumn(name = "person_id", referencedColumnName = "id", nullable = true)
    private Person author;

    @Override
    public Integer getId() {
        return id();
    }
}
