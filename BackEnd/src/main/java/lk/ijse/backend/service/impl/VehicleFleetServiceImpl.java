package lk.ijse.backend.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lk.ijse.backend.dto.VehicleFleetDTO;
import lk.ijse.backend.entity.VehicleCategory;
import lk.ijse.backend.entity.VehicleFleet;
import lk.ijse.backend.repository.VehicleCategoryRepository;
import lk.ijse.backend.repository.VehicleFleetRepository;
import lk.ijse.backend.service.VehicleFleetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleFleetServiceImpl implements VehicleFleetService {
    private final VehicleFleetRepository fleetRepository;
    private final VehicleCategoryRepository categoryRepository;

    @Override
    public VehicleFleetDTO saveFleet(VehicleFleetDTO dto) {
        VehicleCategory category = categoryRepository.findById(dto.getCategory().getId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        VehicleFleet fleet = VehicleFleet.builder()
                .name(dto.getName())
                .imageUrl(dto.getImageUrl())
                .category(category)
                .seats(dto.getSeats())
                .bags(dto.getBags())
                .transmission(dto.getTransmission())
                .pricePerDay(dto.getPricePerDay())
                .build();

        return mapToDTO(fleetRepository.save(fleet));
    }

    @Override
    public VehicleFleetDTO updateFleet(Long id, VehicleFleetDTO dto) {
        VehicleFleet fleet = fleetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fleet not found"));

        VehicleCategory category = categoryRepository.findById(dto.getCategory().getId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        fleet.setName(dto.getName());
        fleet.setImageUrl(dto.getImageUrl());
        fleet.setCategory(category);
        fleet.setSeats(dto.getSeats());
        fleet.setBags(dto.getBags());
        fleet.setTransmission(dto.getTransmission());
        fleet.setPricePerDay(dto.getPricePerDay());

        return mapToDTO(fleetRepository.save(fleet));
    }

    @Override
    public void deleteFleet(Long id) {
        if (!fleetRepository.existsById(id)) {
            throw new EntityNotFoundException("Fleet not found");
        }
        fleetRepository.deleteById(id);
    }

    @Override
    public VehicleFleetDTO getFleetById(Long id) {
        VehicleFleet fleet = fleetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fleet not found"));
        return mapToDTO(fleet);
    }

    @Override
    public List<VehicleFleetDTO> getAllFleets() {
        return fleetRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private VehicleFleetDTO mapToDTO(VehicleFleet fleet) {
        return new VehicleFleetDTO(
                fleet.getId(),
                fleet.getName(),
                fleet.getImageUrl(),
                fleet.getCategory() != null
                        ? new lk.ijse.backend.dto.VehicleCategoryDTO(
                        fleet.getCategory().getId(),
                        fleet.getCategory().getName(),
                        fleet.getCategory().getDescription(),
                        fleet.getCategory().getPricePerDay(),
                        fleet.getCategory().getAvailableVehicles(),
                        fleet.getCategory().getButtonLink()
                )
                        : null,
                fleet.getSeats(),
                fleet.getBags(),
                fleet.getTransmission(),
                fleet.getPricePerDay()
        );
    }
}
