package ram0973.web.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ram0973.web.model.PersonDetails;
import ram0973.web.repository.PersonRepository;

@Service(value = "detailService")
@RequiredArgsConstructor
public class DetailService implements UserDetailsService {

    private final PersonRepository personRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return this
            .personRepository
            .findByEmailIgnoreCase(email)
            .map(PersonDetails::new)
            .orElseThrow(() -> new UsernameNotFoundException("User with such email: " +  email + " not found"));
    }

}

