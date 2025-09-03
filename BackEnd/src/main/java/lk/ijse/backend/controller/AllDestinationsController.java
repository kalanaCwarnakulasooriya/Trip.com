package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.AllDestinationsDTO;
import lk.ijse.backend.service.AllDestinationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/allDestinations")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AllDestinationsController {
    private final AllDestinationsService allDestinationsService;

    @GetMapping
    public ResponseEntity<APIResponse> getAllDestinations() {
        List<AllDestinationsDTO> list = allDestinationsService.getAllDestinations();
        return ResponseEntity.ok(new APIResponse(
                200,
                "All Destinations",
                list
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getDestinationById(@PathVariable Long id) {
        AllDestinationsDTO dto = allDestinationsService.getDestinationById(id);
        if (dto != null) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Destination Found",
                    dto
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Destination Not Found",
                null
        ));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<APIResponse> addDestination(@RequestBody AllDestinationsDTO dto) {
        AllDestinationsDTO saved = allDestinationsService.addDestination(dto);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Destination Added",
                saved
        ));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<APIResponse> updateDestination(@PathVariable Long id, @RequestBody AllDestinationsDTO dto) {
        AllDestinationsDTO updated = allDestinationsService.updateDestination(id, dto);
        if (updated != null) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Destination Updated",
                    updated
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Destination Not Found",
                null
        ));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deleteDestination(@PathVariable Long id) {
        boolean deleted = allDestinationsService.deleteDestination(id);
        if (deleted) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Destination Deleted",
                    null
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Destination Not Found",
                null
        ));
    }
}
