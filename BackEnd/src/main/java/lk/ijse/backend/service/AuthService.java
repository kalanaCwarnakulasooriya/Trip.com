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

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository USERREPOSITORY;
    private final PasswordEncoder PASSWORDENCODER;
    private final JwtUtil JWTUTIL;
    private final MailSendService mailSendService;

    public AuthResponseDTO authenticateWithGoogle(String email) {
        // Find existing user or create new one
        User user = USERREPOSITORY.findByEmail(email)
                .orElseGet(() -> USERREPOSITORY.save(User.builder()
                        .username(email.split("@")[0]) // simple username from email
                        .email(email)
                        .password("") // no password for Google users
                        .role(Role.USER) // default role
                        .build()));

        // Generate JWT token
        String token = JWTUTIL.generateToken(user.getUsername());

        // Optional: send login alert email
        try {
            mailSendService.sendLoggedInEmail(
                    user.getUsername(),
                    user.getEmail(),
                    "Login Alert via Google!"
            );
        } catch (Exception e) {
            System.out.println("Failed to send login alert: " + e.getMessage());
        }

        return new AuthResponseDTO(token, user.getRole().name());
    }

    public AuthResponseDTO authenticate(AuthDTO authDTO) {
        User user =
                USERREPOSITORY.findByUsername(authDTO.getUsername())
                        .orElseThrow(
                                ()-> new UsernameNotFoundException
                                        ("Username not found"));
        if (!PASSWORDENCODER.matches(
                authDTO.getPassword(),
                user.getPassword())) {
            throw new BadCredentialsException("Incorrect password");
        }
        String token = JWTUTIL.generateToken(authDTO.getUsername());
        // Login alert email
        try {
            mailSendService.sendLoggedInEmail(
                    user.getUsername(),
                    user.getEmail(),
                    "Login Alert!"
            );
        } catch (Exception e) {
            System.out.println("Failed to send login alert: " + e.getMessage());
        }

        return new AuthResponseDTO(token, user.getRole().name());
    }

    public String register(RegisterDTO registerDTO) {
        if(USERREPOSITORY.findByUsername(registerDTO.getUsername()).isPresent()){
            throw new RuntimeException("Username already exists");
        }
        User user = User.builder()
                .username(registerDTO.getUsername())
                .password(PASSWORDENCODER.encode(registerDTO.getPassword()))
                .email(registerDTO.getEmail())
                .phone(registerDTO.getPhone())
                .role(Role.valueOf(registerDTO.getRole()))
                .build();
        USERREPOSITORY.save(user);

        // Registered email
        try {
            mailSendService.sendRegisteredEmail(
                    user.getUsername(),
                    user.getEmail(),
                    "Registered Successfully!"
            );
        } catch (Exception e) {
            System.out.println("Failed to send registration email: " + e.getMessage());
        }
        return "User Registration Success";
    }

    public List<RegisterDTO> getAllUsers() {
        return USERREPOSITORY.findAll()
                .stream()
                .map(user -> new RegisterDTO(
                        user.getPassword(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getRole().name()
                ))
                .toList();
    }

}
