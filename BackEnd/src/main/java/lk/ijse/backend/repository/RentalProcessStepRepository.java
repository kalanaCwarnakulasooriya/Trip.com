package lk.ijse.backend.repository;

import lk.ijse.backend.entity.RentalProcessStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalProcessStepRepository extends JpaRepository<RentalProcessStep, Long> {
}
