package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.TravelTipDTO;
import lk.ijse.backend.entity.TravelTip;
import lk.ijse.backend.repository.TravelTipRepository;
import lk.ijse.backend.service.TravelTipService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TravelTipServiceImpl implements TravelTipService {
    private final TravelTipRepository travelTipRepository;

    @Override
    public TravelTipDTO saveTravelTip(TravelTipDTO travelTipDTO) {
        TravelTip travelTip = mapToEntity(travelTipDTO);
        TravelTip saved = travelTipRepository.save(travelTip);
        return mapToDTO(saved);
    }

    @Override
    public TravelTipDTO updateTravelTip(Long id, TravelTipDTO travelTipDTO) {
        TravelTip existing = travelTipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TravelTip not found with id: " + id));

        existing.setCategory(travelTipDTO.getCategory());
        existing.setTitle(travelTipDTO.getTitle());
        existing.setExcerpt(travelTipDTO.getExcerpt());
        existing.setImageUrl(travelTipDTO.getImageUrl());
        existing.setLink(travelTipDTO.getLink());

        TravelTip updated = travelTipRepository.save(existing);
        return mapToDTO(updated);
    }

    @Override
    public void deleteTravelTip(Long id) {
        travelTipRepository.deleteById(id);
    }

    @Override
    public TravelTipDTO getTravelTipById(Long id) {
        TravelTip travelTip = travelTipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TravelTip not found with id: " + id));
        return mapToDTO(travelTip);
    }

    @Override
    public List<TravelTipDTO> getAllTravelTips() {
        return travelTipRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Mapper methods
    private TravelTipDTO mapToDTO(TravelTip travelTip) {
        return new TravelTipDTO(
                travelTip.getId(),
                travelTip.getCategory(),
                travelTip.getTitle(),
                travelTip.getExcerpt(),
                travelTip.getImageUrl(),
                travelTip.getLink()
        );
    }

    private TravelTip mapToEntity(TravelTipDTO dto) {
        return TravelTip.builder()
                .id(dto.getId())
                .category(dto.getCategory())
                .title(dto.getTitle())
                .excerpt(dto.getExcerpt())
                .imageUrl(dto.getImageUrl())
                .link(dto.getLink())
                .build();
    }
}
