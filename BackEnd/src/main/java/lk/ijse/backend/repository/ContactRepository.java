package lk.ijse.backend.repository;

import lk.ijse.backend.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    // No extra methods needed, JpaRepository gives save, findAll, findById, deleteById etc.
}
