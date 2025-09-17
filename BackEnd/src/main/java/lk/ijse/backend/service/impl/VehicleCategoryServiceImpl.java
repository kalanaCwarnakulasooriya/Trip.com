package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.VehicleCategoryDTO;
import lk.ijse.backend.entity.VehicleCategory;
import lk.ijse.backend.repository.VehicleCategoryRepository;
import lk.ijse.backend.service.VehicleCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleCategoryServiceImpl implements VehicleCategoryService {
    private final VehicleCategoryRepository repository;

    private VehicleCategoryDTO entityToDTO(VehicleCategory entity) {
        return new VehicleCategoryDTO(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getPricePerDay(),
                entity.getAvailableVehicles(),
                entity.getButtonLink()
        );
    }

    private VehicleCategory dtoToEntity(VehicleCategoryDTO dto) {
        return VehicleCategory.builder()
                .id(dto.getId())
                .name(dto.getName())
                .description(dto.getDescription())
                .pricePerDay(dto.getPricePerDay())
                .availableVehicles(dto.getAvailableVehicles())
                .buttonLink(dto.getButtonLink())
                .build();
    }

    @Override
    public VehicleCategoryDTO saveCategory(VehicleCategoryDTO dto) {
        VehicleCategory entity = repository.save(dtoToEntity(dto));
        return entityToDTO(entity);
    }

    @Override
    public VehicleCategoryDTO updateCategory(VehicleCategoryDTO dto) {
        if (!repository.existsById(dto.getId())) {
            throw new RuntimeException("Vehicle category not found with id: " + dto.getId());
        }
        VehicleCategory entity = repository.save(dtoToEntity(dto));
        return entityToDTO(entity);
    }

    @Override
    public VehicleCategoryDTO getCategoryById(Long id) {
        VehicleCategory entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle category not found with id: " + id));
        return entityToDTO(entity);
    }

    @Override
    public List<VehicleCategoryDTO> getAllCategories() {
        return repository.findAll().stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCategory(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Vehicle category not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
