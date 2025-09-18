package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleFleetDTO {
    private Long id;
    private String name;
    private String imageUrl;
    private VehicleCategoryDTO category;
    private Integer seats;
    private Integer bags;
    private String transmission;
    private double pricePerDay;
}
