package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.VehicleFleetDTO;
import lk.ijse.backend.service.VehicleFleetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicleFleets")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class VehicleFleetController {
    private final VehicleFleetService fleetService;

    @GetMapping
    public ResponseEntity<APIResponse> getAllFleets() {
        List<VehicleFleetDTO> fleets = fleetService.getAllFleets();
        return ResponseEntity.ok(new APIResponse(
                200,
                "Vehicle Fleets Fetched Successfully",
                fleets
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getFleetById(@PathVariable Long id) {
        VehicleFleetDTO dto = fleetService.getFleetById(id);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Vehicle Fleet Fetched Successfully",
                dto
        ));
    }

    @PostMapping
    public ResponseEntity<APIResponse> createFleet(@RequestBody VehicleFleetDTO dto) {
        VehicleFleetDTO savedDto = fleetService.saveFleet(dto);
        return new ResponseEntity<>(new APIResponse(
                201,
                "Vehicle Fleet Created Successfully",
                savedDto
        ), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<APIResponse> updateFleet(@PathVariable Long id, @RequestBody VehicleFleetDTO dto) {
        VehicleFleetDTO updatedDto = fleetService.updateFleet(id, dto);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Vehicle Fleet Updated Successfully",
                updatedDto
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deleteFleet(@PathVariable Long id) {
        fleetService.deleteFleet(id);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Vehicle Fleet Deleted Successfully",
                null
        ));
    }
}
