package lk.ijse.backend.repository;

import lk.ijse.backend.entity.Packages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<Packages, Long> {
    List<Package> findByTag(String tag);

    List<Package> findByTitleContainingIgnoreCase(String keyword);
}
