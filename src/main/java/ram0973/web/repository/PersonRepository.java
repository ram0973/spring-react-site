package ram0973.web.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import ram0973.web.model.Person;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {

    @Query("SELECT p FROM Person p WHERE p.email = LOWER(:email)")
    Optional<Person> findByEmailIgnoreCase(@Param(value = "email") String email);

    Optional<Person> findById(int id);

    @NonNull
    Page<Person> findAll(@NonNull Pageable pageable);
}
