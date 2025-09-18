package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RentalProcessStepDTO {
    private Long id;
    private String title;
    private String description;
    private String iconSvg;
    private Integer stepNumber;
}
