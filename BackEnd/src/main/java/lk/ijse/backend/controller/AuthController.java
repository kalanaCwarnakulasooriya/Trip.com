package lk.ijse.backend.controller;

import jakarta.validation.Valid;
import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.AuthDTO;
import lk.ijse.backend.dto.RegisterDTO;
import lk.ijse.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService AUTHSERVICE;

    @PostMapping("/register")
    public ResponseEntity<APIResponse> registerUser(
            @Valid @RequestBody RegisterDTO registerDTO) {
        return ResponseEntity.ok(new APIResponse(
                200,
                "OK",
                AUTHSERVICE.register(registerDTO)));
    }

    @PostMapping("/login")
    public ResponseEntity<APIResponse> login(
            @RequestBody AuthDTO authDTO) {
        return ResponseEntity.ok(new APIResponse(
                200,
                "OK",
                AUTHSERVICE.authenticate(authDTO)));
    }
}
