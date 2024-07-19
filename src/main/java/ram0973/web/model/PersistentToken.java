package ram0973.web.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ram0973.web.service.CustomPersistentTokenRememberMeServices;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * Persistent tokens are used by Spring Security to automatically log in users.
 * @see CustomPersistentTokenRememberMeServices
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "persistent_token")
public class PersistentToken implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private static final int MAX_USER_AGENT_LEN = 255;

    @Id
    private String series;

    @JsonIgnore
    @NotNull
    @Column(name = "token_value", nullable = false)
    private String tokenValue;

    @Column(name = "token_date")
    private LocalDate tokenDate;

    //an IPV6 address max length is 39 characters
    @Size(min = 0, max = 39)
    @Column(name = "ip_address", length = 39)
    private String ipAddress;

    @Column(name = "user_agent")
    private String userAgent;

    @JsonIgnore
    @ManyToOne
    private Person person;

    public void setUserAgent(String userAgent) {
        if (userAgent.length() >= MAX_USER_AGENT_LEN) {
            this.userAgent = userAgent.substring(0, MAX_USER_AGENT_LEN - 1);
        } else {
            this.userAgent = userAgent;
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PersistentToken)) {
            return false;
        }
        return Objects.equals(series, ((PersistentToken) o).series);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(series);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PersistentToken{" +
            "series='" + series + '\'' +
            ", tokenValue='" + tokenValue + '\'' +
            ", tokenDate=" + tokenDate +
            ", ipAddress='" + ipAddress + '\'' +
            ", userAgent='" + userAgent + '\'' +
            "}";
    }
}
