package lk.ijse.backend.service;

import lk.ijse.backend.dto.VehicleCategoryDTO;

import java.util.List;

public interface VehicleCategoryService {
    VehicleCategoryDTO saveCategory(VehicleCategoryDTO dto);
    VehicleCategoryDTO updateCategory(VehicleCategoryDTO dto);
    VehicleCategoryDTO getCategoryById(Long id);
    List<VehicleCategoryDTO> getAllCategories();
    void deleteCategory(Long id);
}
