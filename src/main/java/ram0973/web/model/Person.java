package ram0973.web.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "persons", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
@SuperBuilder
@NoArgsConstructor
@Getter
@Setter
public class Person extends BaseModel implements Serializable {
    @Column(name = "email", nullable = false, unique = true)
    @NotBlank
    @Email
    @Size(max = 128)
    private String email;

    @JsonIgnore
    @Column(name = "password", nullable = false)
    @NotBlank
    @Size(max = 128)
    private String password;

    @Column(name = "account_enable")
    private boolean enabled;

    @Column(name = "credentials_expired")
    private boolean credentialsNonExpired;

    @Column(name = "account_expired")
    private boolean accountNonExpired;

    @Column(name = "account_locked")
    private boolean nonLocked;

    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "person_role", joinColumns = @JoinColumn(name = "id"),
        uniqueConstraints = {@UniqueConstraint(columnNames = {"id", "person_roles"}, name = "person_roles_unique")})
    @Column(name = "person_roles")
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> roles = new HashSet<>();

    public void addRole(Role role) {
        this.roles.add(role);
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this
            .roles
            .stream()
            .map(role -> new SimpleGrantedAuthority(role.label))
            .collect(Collectors.toSet());
    }
}
