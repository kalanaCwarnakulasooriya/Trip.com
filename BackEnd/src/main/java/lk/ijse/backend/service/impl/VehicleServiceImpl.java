package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.VehicleDTO;
import lk.ijse.backend.dto.VehicleFeatureDTO;
import lk.ijse.backend.entity.Vehicle;
import lk.ijse.backend.entity.VehicleFeature;
import lk.ijse.backend.repository.VehicleRepository;
import lk.ijse.backend.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {
    private final VehicleRepository vehicleRepository;

    @Override
    public VehicleDTO saveVehicle(VehicleDTO vehicleDTO) {
        Vehicle vehicle = mapToEntity(vehicleDTO);
        vehicle.getFeatures().forEach(f -> f.setVehicle(vehicle));
        Vehicle saved = vehicleRepository.save(vehicle);
        return mapToDTO(saved);
    }

    @Override
    public VehicleDTO updateVehicle(Long id, VehicleDTO vehicleDTO) {
        Vehicle existing = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        existing.setName(vehicleDTO.getName());
        existing.setImageUrl(vehicleDTO.getImageUrl());
        existing.setBadge(vehicleDTO.getBadge());
        existing.setRating(vehicleDTO.getRating());
        existing.setReviewCount(vehicleDTO.getReviewCount());
        existing.setPricePerDay(vehicleDTO.getPricePerDay());
        existing.setPricePeriod(vehicleDTO.getPricePeriod());

        // replace features
        existing.getFeatures().clear();
        List<VehicleFeature> newFeatures = vehicleDTO.getFeatures().stream()
                .map(f -> new VehicleFeature(null, f.getName(), f.getIcon(), existing))
                .collect(Collectors.toList());
        existing.getFeatures().addAll(newFeatures);

        Vehicle updated = vehicleRepository.save(existing);
        return mapToDTO(updated);
    }

    @Override
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }

    @Override
    public VehicleDTO getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        return mapToDTO(vehicle);
    }

    @Override
    public List<VehicleDTO> getAllVehicles() {
        return vehicleRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // 🔄 Mapping helpers
    private VehicleDTO mapToDTO(Vehicle vehicle) {
        return new VehicleDTO(
                vehicle.getId(),
                vehicle.getName(),
                vehicle.getImageUrl(),
                vehicle.getBadge(),
                vehicle.getRating(),
                vehicle.getReviewCount(),
                vehicle.getFeatures().stream()
                        .map(f -> new VehicleFeatureDTO(f.getName(), f.getIcon()))
                        .collect(Collectors.toList()),
                vehicle.getPricePerDay(),
                vehicle.getPricePeriod()
        );
    }

    private Vehicle mapToEntity(VehicleDTO dto) {
        Vehicle vehicle = new Vehicle();
        vehicle.setId(dto.getId());
        vehicle.setName(dto.getName());
        vehicle.setImageUrl(dto.getImageUrl());
        vehicle.setBadge(dto.getBadge());
        vehicle.setRating(dto.getRating());
        vehicle.setReviewCount(dto.getReviewCount());
        vehicle.setPricePerDay(dto.getPricePerDay());
        vehicle.setPricePeriod(dto.getPricePeriod());

        if (dto.getFeatures() != null) {
            List<VehicleFeature> features = dto.getFeatures().stream()
                    .map(f -> new VehicleFeature(null, f.getName(), f.getIcon(), vehicle))
                    .collect(Collectors.toList());
            vehicle.setFeatures(features);
        }
        return vehicle;
    }
}
