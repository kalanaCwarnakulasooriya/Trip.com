package lk.ijse.backend.service;

import lk.ijse.backend.dto.AuthDTO;
import lk.ijse.backend.dto.AuthResponseDTO;
import lk.ijse.backend.dto.RegisterDTO;
import lk.ijse.backend.entity.User;
import lk.ijse.backend.entity.enums.Role;
import lk.ijse.backend.repository.UserRepository;
import lk.ijse.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class AuthService {
    private final UserRepository USERREPOSITORY;
    private final PasswordEncoder PASSWORDENCODER;
    private final JwtUtil JWTUTIL;

    public AuthResponseDTO authenticate(AuthDTO authDTO) {
        User user=
                USERREPOSITORY.findByUsername(authDTO.getUsername())
                        .orElseThrow(
                                ()->new UsernameNotFoundException
                                        ("Username not found"));
        if (!PASSWORDENCODER.matches(
                authDTO.getPassword(),
                user.getPassword())) {
            throw new BadCredentialsException("Incorrect password");
        }
        String token = JWTUTIL.generateToken(authDTO.getUsername());
        return  new AuthResponseDTO(token);
    }
    public String register(RegisterDTO registerDTO) {
        if(USERREPOSITORY.findByUsername(
                registerDTO.getUsername()).isPresent()){
            throw new RuntimeException("Username already exists");
        }
        User user=User.builder()
                .username(registerDTO.getUsername())
                .password(PASSWORDENCODER.encode(
                        registerDTO.getPassword()))
                .role(Role.valueOf(registerDTO.getRole()))
                .build();
        USERREPOSITORY.save(user);
        return  "User Registration Success";
    }
}
