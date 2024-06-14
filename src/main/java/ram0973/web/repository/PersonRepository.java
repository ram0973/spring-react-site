package ram0973.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ram0973.web.model.Person;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    @Query("SELECT e FROM Person e WHERE e.email = :email")
    Optional<Person> findByEmail(@Param(value = "email") String email);
}
