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
    private String category;   // Or use VehicleCategoryDTO if you want full category details
    private int seats;
    private int bags;
    private String transmission;
    private double pricePerDay;
}
