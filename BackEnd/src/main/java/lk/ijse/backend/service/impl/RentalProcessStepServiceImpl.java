package lk.ijse.backend.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lk.ijse.backend.dto.RentalProcessStepDTO;
import lk.ijse.backend.entity.RentalProcessStep;
import lk.ijse.backend.repository.RentalProcessStepRepository;
import lk.ijse.backend.service.RentalProcessStepService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RentalProcessStepServiceImpl implements RentalProcessStepService {
    private final RentalProcessStepRepository repository;

    @Override
    public List<RentalProcessStepDTO> getAllSteps() {
        return repository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RentalProcessStepDTO getStepById(Long id) {
        RentalProcessStep step = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Step not found with id: " + id));
        return mapToDTO(step);
    }

    @Override
    public RentalProcessStepDTO saveStep(RentalProcessStepDTO dto) {
        RentalProcessStep step = mapToEntity(dto);
        RentalProcessStep saved = repository.save(step);
        return mapToDTO(saved);
    }

    @Override
    public RentalProcessStepDTO updateStep(Long id, RentalProcessStepDTO dto) {
        RentalProcessStep existing = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Step not found with id: " + id));

        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setIconSvg(dto.getIconSvg());
        existing.setStepNumber(dto.getStepNumber());

        RentalProcessStep updated = repository.save(existing);
        return mapToDTO(updated);
    }

    @Override
    public void deleteStep(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Step not found with id: " + id);
        }
        repository.deleteById(id);
    }

    // ===== Mapping Methods =====
    private RentalProcessStepDTO mapToDTO(RentalProcessStep step) {
        return new RentalProcessStepDTO(
                step.getId(),
                step.getTitle(),
                step.getDescription(),
                step.getIconSvg(),
                step.getStepNumber()
        );
    }

    private RentalProcessStep mapToEntity(RentalProcessStepDTO dto) {
        return RentalProcessStep.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .iconSvg(dto.getIconSvg())
                .stepNumber(dto.getStepNumber())
                .build();
    }
}
