package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleDTO {
    private Long id;
    private String name;
    private String imageUrl;
    private String badge;
    private double rating;
    private int reviewCount;
    private List<VehicleFeatureDTO> features;
    private double pricePerDay;
    private String pricePeriod;
}
