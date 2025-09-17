package lk.ijse.backend.repository;

import lk.ijse.backend.entity.VehicleFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleFeatureRepository extends JpaRepository<VehicleFeature, Long> {
}
