package lk.ijse.backend.repository;

import lk.ijse.backend.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository {
    Optional<User> findByUsername(String username);
}
