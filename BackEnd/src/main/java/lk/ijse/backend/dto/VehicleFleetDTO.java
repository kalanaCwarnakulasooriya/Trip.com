package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VehicleFleetDTO {
    private Long id;
    private String name;
    private String imageUrl;
    private String category;
    private Integer seats;
    private Integer bags;
    private String transmission;
    private double pricePerDay;
}
