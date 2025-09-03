package lk.ijse.backend.repository;

import lk.ijse.backend.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    List<Destination> findByTravelPackageId(Long packageId);

    List<Destination> findByLocationContainingIgnoreCase(String location);

    List<Destination> findByCurrency(String currency);
}
