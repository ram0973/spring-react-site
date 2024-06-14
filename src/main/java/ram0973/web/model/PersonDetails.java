package ram0973.web.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Objects;

public record PersonDetails(Person person) implements UserDetails {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return person.getAuthorities();
    }

    @Override
    public String getPassword() {
        return person.getPassword();
    }

    @Override
    public String getUsername() {
        return person.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return person.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.person.isNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return person.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return person.isEnabled();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PersonDetails that)) return false;
        return Objects.equals(person, that.person);
    }

    @Override
    public int hashCode() {
        return Objects.hash(person);
    }
}

