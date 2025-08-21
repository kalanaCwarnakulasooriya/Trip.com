package lk.ijse.backend.repository;

import lk.ijse.backend.entity.User;

import java.util.Optional;

public interface UserRepository {
    Optional<User> findByUsername(String username);
}
