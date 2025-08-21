package lk.ijse.backend.dto;

import lombok.Data;

@Data
public class RegisterDTO {
    private String username;
    private String password;
    private String email;
    private int phone;
    private String role;
}
