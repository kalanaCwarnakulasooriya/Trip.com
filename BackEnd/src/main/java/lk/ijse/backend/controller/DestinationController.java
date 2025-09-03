package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.DestinationDTO;
import lk.ijse.backend.service.DestinationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DestinationController {
    private final DestinationService destinationService;

    @GetMapping
    public ResponseEntity<APIResponse> getAllDestinations() {
        List<DestinationDTO> destinations = destinationService.getAllDestinations();
        return ResponseEntity.ok(new APIResponse(
                200,
                "Destinations retrieved successfully",
                destinations
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getDestinationById(@PathVariable Long id) {
        DestinationDTO destination = destinationService.getDestinationById(id);
        if (destination != null) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Destination retrieved successfully",
                    destination
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Destination not found",
                null
        ));
    }

    @GetMapping("/package/{packageId}")
    public ResponseEntity<APIResponse> getDestinationsByPackage(@PathVariable Long packageId) {
        List<DestinationDTO> destinations = destinationService.getDestinationsByPackage(packageId);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Destinations retrieved successfully",
                destinations
        ));
    }

    @PostMapping
    public ResponseEntity<APIResponse> addDestination(@RequestBody DestinationDTO destinationDTO) {
        DestinationDTO savedDestination = destinationService.addDestination(destinationDTO);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Destination added successfully",
                savedDestination
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<APIResponse> updateDestination(@PathVariable Long id, @RequestBody DestinationDTO destinationDTO) {
        DestinationDTO updatedDestination = destinationService.updateDestination(id, destinationDTO);
        if (updatedDestination != null) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Destination updated successfully",
                    updatedDestination
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Destination not found",
                null
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deleteDestination(@PathVariable Long id) {
        boolean deleted = destinationService.deleteDestination(id);
        if (deleted) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Destination deleted successfully",
                    null
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Destination not found",
                null
        ));
    }
}
