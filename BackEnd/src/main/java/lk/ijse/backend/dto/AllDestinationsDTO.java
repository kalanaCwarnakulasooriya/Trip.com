package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllDestinationsDTO {
    private Long id;
    private String title;
    private String location;
    private String imageUrl;
    private double rating;
    private String currency;
    private double price;
}
