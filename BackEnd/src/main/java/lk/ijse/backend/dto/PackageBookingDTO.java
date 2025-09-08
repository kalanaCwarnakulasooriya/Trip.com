package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PackageBookingDTO {
    private Long id;
    private String chosenPackage;
    private LocalDate travelDate;
    private Integer guests;
    private String fullName;
    private String email;
    private String phone;
}
