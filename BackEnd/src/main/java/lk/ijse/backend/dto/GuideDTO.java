package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GuideDTO {
    private Long id;
    private String name;
    private String position;
    private Integer experienceYears;
    private String location;
    private String specialities;
    private String bio;
    private String imagePath;
    private Map<String,String> socialLinks;
}
