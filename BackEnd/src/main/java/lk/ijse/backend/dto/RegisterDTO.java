package lk.ijse.backend.dto;

import lombok.Data;

@Data
public class RegisterDTO {
    private String password;
    private String username;
    private String email;
    private String phone;
    private String role; //USER or ADMIN
}
