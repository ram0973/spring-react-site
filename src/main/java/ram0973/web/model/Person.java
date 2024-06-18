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
import org.hibernate.proxy.HibernateProxy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "persons", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
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
    private boolean enabled = true;

    @Column(name = "credentials_expired")
    private boolean credentialsNonExpired = true;

    @Column(name = "account_expired")
    private boolean accountNonExpired = true;

    @Column(name = "account_locked")
    private boolean nonLocked = true;

    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "person_role", joinColumns = @JoinColumn(name = "id"),
        uniqueConstraints = {@UniqueConstraint(columnNames = {"id", "person_roles"}, name = "person_roles_unique")})
    @Column(name = "person_roles")
    @ElementCollection(fetch = FetchType.EAGER)
    private final Set<Role> roles = new HashSet<>();

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

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getEffectiveClass(this) != getEffectiveClass(o)) return false;
        Person person = (Person) o;
        return getId() != null && Objects.equals(getId(), person.getId());
    }

    @Override
    public final int hashCode() {
        return getEffectiveClass(this).hashCode();
    }

    public static Class<?> getEffectiveClass(Object o) {
        return o instanceof HibernateProxy ?
            ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
    }
}
