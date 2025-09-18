package lk.ijse.backend.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lk.ijse.backend.dto.VehicleFleetDTO;
import lk.ijse.backend.entity.VehicleFleet;
import lk.ijse.backend.repository.VehicleFleetRepository;
import lk.ijse.backend.service.VehicleFleetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleFleetServiceImpl implements VehicleFleetService {
    private final VehicleFleetRepository repository;

    @Override
    public List<VehicleFleetDTO> getAllFleets() {
        return repository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VehicleFleetDTO getFleetById(Long id) {
        VehicleFleet fleet = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fleet not found with id: " + id));
        return mapToDTO(fleet);
    }

    @Override
    public VehicleFleetDTO saveFleet(VehicleFleetDTO dto) {
        VehicleFleet fleet = mapToEntity(dto);
        VehicleFleet saved = repository.save(fleet);
        return mapToDTO(saved);
    }

    @Override
    public VehicleFleetDTO updateFleet(Long id, VehicleFleetDTO dto) {
        VehicleFleet existing = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fleet not found with id: " + id));

        existing.setName(dto.getName());
        existing.setImageUrl(dto.getImageUrl());
        existing.setCategory(dto.getCategory());
        existing.setSeats(dto.getSeats());
        existing.setBags(dto.getBags());
        existing.setTransmission(dto.getTransmission());
        existing.setPricePerDay(dto.getPricePerDay());

        VehicleFleet updated = repository.save(existing);
        return mapToDTO(updated);
    }

    @Override
    public void deleteFleet(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Fleet not found with id: " + id);
        }
        repository.deleteById(id);
    }

    // ===== Mapping Methods =====
    private VehicleFleetDTO mapToDTO(VehicleFleet fleet) {
        return VehicleFleetDTO.builder()
                .id(fleet.getId())
                .name(fleet.getName())
                .imageUrl(fleet.getImageUrl())
                .category(fleet.getCategory())
                .seats(fleet.getSeats())
                .bags(fleet.getBags())
                .transmission(fleet.getTransmission())
                .pricePerDay(fleet.getPricePerDay())
                .build();
    }

    private VehicleFleet mapToEntity(VehicleFleetDTO dto) {
        return VehicleFleet.builder()
                .id(dto.getId())
                .name(dto.getName())
                .imageUrl(dto.getImageUrl())
                .category(dto.getCategory())
                .seats(dto.getSeats())
                .bags(dto.getBags())
                .transmission(dto.getTransmission())
                .pricePerDay(dto.getPricePerDay())
                .build();
    }
}
