package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.GuideDTO;
import lk.ijse.backend.entity.Guide;
import lk.ijse.backend.repository.GuideRepository;
import lk.ijse.backend.service.GuideService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GuideServiceImpl implements GuideService {
    private final GuideRepository guideRepository;

    @Override
    public GuideDTO saveGuide(GuideDTO guideDTO) {
        Guide guide = mapToEntity(guideDTO);
        Guide saved = guideRepository.save(guide);
        return mapToDTO(saved);
    }

    @Override
    public GuideDTO updateGuide(Long id, GuideDTO guideDTO) {
        Guide existing = guideRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Guide not found with id: " + id));

        existing.setName(guideDTO.getName());
        existing.setPosition(guideDTO.getPosition());
        existing.setExperienceYears(guideDTO.getExperienceYears());
        existing.setLocation(guideDTO.getLocation());
        existing.setSpecialities(guideDTO.getSpecialities());
        existing.setBio(guideDTO.getBio());
        existing.setImagePath(guideDTO.getImagePath());
        existing.setSocialLinks(guideDTO.getSocialLinks());

        Guide updated = guideRepository.save(existing);
        return mapToDTO(updated);
    }

    @Override
    public boolean deleteGuide(Long id) {
        if (!guideRepository.existsById(id)) {
            return false; // not deleted
        }
        guideRepository.deleteById(id);
        return true; // deleted successfully
    }

    @Override
    public GuideDTO getGuideById(Long id) {
        Guide guide = guideRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Guide not found with id: " + id));
        return mapToDTO(guide);
    }

    @Override
    public List<GuideDTO> getAllGuides() {
        return guideRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ---------------- Mapping Helpers ---------------- //

    private GuideDTO mapToDTO(Guide guide) {
        return new GuideDTO(
                guide.getId(),
                guide.getName(),
                guide.getPosition(),
                guide.getExperienceYears(),
                guide.getLocation(),
                guide.getSpecialities(),
                guide.getBio(),
                guide.getImagePath(),
                guide.getSocialLinks()
        );
    }

    private Guide mapToEntity(GuideDTO dto) {
        return Guide.builder()
                .id(dto.getId())
                .name(dto.getName())
                .position(dto.getPosition())
                .experienceYears(dto.getExperienceYears())
                .location(dto.getLocation())
                .specialities(dto.getSpecialities())
                .bio(dto.getBio())
                .imagePath(dto.getImagePath())
                .socialLinks(dto.getSocialLinks())
                .build();
    }
}
