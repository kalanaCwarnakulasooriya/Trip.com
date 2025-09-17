package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.VehicleCategoryDTO;
import lk.ijse.backend.service.VehicleCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicleCategories")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class VehicleCategoryController {
    private final VehicleCategoryService service;

    @GetMapping
    public ResponseEntity<APIResponse> getAllCategories() {
        List<VehicleCategoryDTO> categories = service.getAllCategories();
        return ResponseEntity.ok(new APIResponse(
                200,
                "Vehicle Categories Fetched Successfully",
                categories
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getCategoryById(@PathVariable Long id) {
        VehicleCategoryDTO dto = service.getCategoryById(id);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Vehicle Category Fetched Successfully",
                dto
        ));
    }

    @PostMapping
    public ResponseEntity<APIResponse> createCategory(@RequestBody VehicleCategoryDTO dto) {
        VehicleCategoryDTO savedDto = service.saveCategory(dto);
        return new ResponseEntity<>(new APIResponse(
                201,
                "Vehicle Category Created Successfully",
                savedDto
        ), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<APIResponse> updateCategory(
            @PathVariable Long id,
            @RequestBody VehicleCategoryDTO dto
    ) {
        dto.setId(id);
        VehicleCategoryDTO updatedDto = service.updateCategory(dto);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Vehicle Category Updated Successfully",
                updatedDto
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deleteCategory(@PathVariable Long id) {
        service.deleteCategory(id);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Vehicle Category Deleted Successfully",
                null
        ));
    }
}
