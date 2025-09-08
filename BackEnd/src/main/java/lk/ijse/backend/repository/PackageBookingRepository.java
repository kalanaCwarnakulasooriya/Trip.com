package lk.ijse.backend.repository;

import lk.ijse.backend.entity.PackageBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackageBookingRepository extends JpaRepository<PackageBooking, Long> {
}
