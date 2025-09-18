package lk.ijse.backend.repository;

import lk.ijse.backend.entity.VehicleFleet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleFleetRepository extends JpaRepository<VehicleFleet, Long> {
}
