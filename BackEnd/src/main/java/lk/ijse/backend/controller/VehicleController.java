package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.VehicleDTO;
import lk.ijse.backend.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class VehicleController {
    private final VehicleService vehicleService;

    // ✅ CREATE
    @PostMapping
    public ResponseEntity<APIResponse> createVehicle(@RequestBody VehicleDTO vehicleDTO) {
        VehicleDTO savedVehicle = vehicleService.saveVehicle(vehicleDTO);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Vehicle created successfully",
                savedVehicle
        ));
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<APIResponse> updateVehicle(@PathVariable Long id, @RequestBody VehicleDTO vehicleDTO) {
        VehicleDTO updated = vehicleService.updateVehicle(id, vehicleDTO);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Vehicle updated successfully",
                updated
        ));
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Vehicle deleted successfully",
                null
        ));
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getVehicleById(@PathVariable Long id) {
        VehicleDTO vehicle = vehicleService.getVehicleById(id);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Vehicle fetched successfully",
                vehicle
        ));
    }

    // ✅ GET ALL
    @GetMapping
    public ResponseEntity<APIResponse> getAllVehicles() {
        List<VehicleDTO> vehicles = vehicleService.getAllVehicles();
        return ResponseEntity.ok(new APIResponse(
                200,
                "Vehicles fetched successfully",
                vehicles
        ));
    }
}
