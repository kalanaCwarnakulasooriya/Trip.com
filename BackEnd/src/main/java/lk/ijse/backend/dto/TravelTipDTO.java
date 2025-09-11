package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TravelTipDTO {
    private Long id;
    private String category;
    private String title;
    private String excerpt;
    private String imageUrl;
    private String link;
}
