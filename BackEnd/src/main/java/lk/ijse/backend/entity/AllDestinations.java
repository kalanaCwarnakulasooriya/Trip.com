package lk.ijse.backend.entity;

import jakarta.persistence.*;
import lk.ijse.backend.entity.enums.Currency;
import lk.ijse.backend.entity.enums.PriceRange;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllDestinations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, length = 100)
    private String location;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private Double rating;

    @Enumerated(EnumType.STRING)
    private Currency currency;

    @Column(nullable = false)
    private Double price;

    @ElementCollection
    @CollectionTable(
            name = "destination_categories",
            joinColumns = @JoinColumn(name = "destination_id")
    )
    @Column(name = "category")
    private List<String> category;

    @Enumerated(EnumType.STRING)
    private PriceRange priceRange;
}
