package lk.ijse.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Guide {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 60)
    private String position;

    private Integer experienceYears;

    @Column(length = 100)
    private String location;

    @Column(length = 200)
    private String specialities;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(length = 255)
    private String imagePath;

    /**
     * Social links stored in separate table `guide_social_links`
     * with key = platform, value = url
     */
    @ElementCollection
    @CollectionTable(
            name = "guide_social_links",
            joinColumns = @JoinColumn(name = "guide_id")
    )
    @MapKeyColumn(name = "platform")
    @Column(name = "url")
    private Map<String, String> socialLinks;
}
