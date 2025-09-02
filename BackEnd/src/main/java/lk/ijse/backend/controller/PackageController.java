package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.PackagesDTO;
import lk.ijse.backend.service.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PackageController {
    @Autowired
    private PackageService packageService;

    @GetMapping
    public ResponseEntity<APIResponse> getAllPackages() {
        List<PackagesDTO> packages = packageService.getAllPackages();
        return ResponseEntity.ok(new APIResponse(
                200,
                "Packages retrieved successfully",
                packages
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getPackageById(@PathVariable Long id) {
        PackagesDTO packagesDTO = packageService.getPackageById(id);
        if (packagesDTO != null) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Package retrieved successfully",
                    packagesDTO
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Package not found",
                null
        ));
    }

    @PostMapping
    public ResponseEntity<APIResponse> addPackage(@RequestBody PackagesDTO packagesDTO) {
        PackagesDTO savedPackage = packageService.addPackage(packagesDTO);
        return ResponseEntity.status(201).body(new APIResponse(
                201,
                "Package added successfully",
                savedPackage
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<APIResponse> updatePackage(@PathVariable Long id, @RequestBody PackagesDTO packagesDTO) {
        PackagesDTO updatedPackage = packageService.updatePackage(id, packagesDTO);
        if (updatedPackage != null) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Package updated successfully",
                    updatedPackage
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Package not found",
                null
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deletePackage(@PathVariable Long id) {
        boolean deleted = packageService.deletePackage(id);
        if (deleted) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Package deleted successfully",
                    null
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Package not found",
                null
        ));
    }
}
