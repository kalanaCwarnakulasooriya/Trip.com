package lk.ijse.backend.repository;

import lk.ijse.backend.entity.AllDestinations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllDestinationsRepository extends JpaRepository<AllDestinations, Long> {
}
