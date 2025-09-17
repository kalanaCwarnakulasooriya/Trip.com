package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleCategoryDTO {
    private Long id;
    private String name;
    private String description;
    private String iconSvg;
    private double pricePerDay;
    private Integer availableVehicles;
    private String buttonLink;
}
