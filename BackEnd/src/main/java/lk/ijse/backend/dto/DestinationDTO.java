package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DestinationDTO {
    private Long id;
    private String title;
    private String location;
    private String imageUrl;
    private Double price;
    private String currency;
    private Double rating;
    private Integer reviews;
    private String duration;
}
