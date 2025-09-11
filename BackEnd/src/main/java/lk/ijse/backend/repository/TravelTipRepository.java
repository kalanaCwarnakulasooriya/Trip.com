package lk.ijse.backend.repository;

import lk.ijse.backend.entity.TravelTip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelTipRepository extends JpaRepository<TravelTip, Long> {
}
