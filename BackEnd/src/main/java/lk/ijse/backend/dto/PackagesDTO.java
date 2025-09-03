package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PackagesDTO {
    private String tag; // Most Popular,Best Value,New
    private String title;
    private String description;
    private List<String> features;
    private double price;
    private String unit; //per person
}
