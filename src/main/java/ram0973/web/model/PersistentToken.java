package ram0973.web.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "persistent_logins")
public class PersistentToken implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private static final int MAX_USER_AGENT_LEN = 255;

    @Id
    private String series;

    @Id
    private String token;

    @NotNull
    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "last_used")
    private Date last_used;

}
